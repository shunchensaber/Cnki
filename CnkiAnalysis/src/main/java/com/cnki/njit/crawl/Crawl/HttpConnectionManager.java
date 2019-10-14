package com.cnki.njit.crawl.Crawl;


import org.apache.http.client.CookieStore;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.HttpClientConnectionManager;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.ssl.SSLContextBuilder;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.concurrent.TimeUnit;

/**
 * 连接池管理类
 * @author LAO
 *
 */
@Component
public class HttpConnectionManager {
	//日志常量
	private static final org.slf4j.Logger Logger = LoggerFactory.getLogger(HttpConnectionManager.class);
	
	@SuppressWarnings("deprecation")
	private static SSLContextBuilder builder = null;
    private static SSLConnectionSocketFactory sslsf = null;
    private static PoolingHttpClientConnectionManager connectionManager = null;
    @SuppressWarnings("deprecation")
	@PostConstruct
    public void init() {
    	 builder = new SSLContextBuilder();
         try {
			builder.loadTrustMaterial(null, new TrustStrategy() {
			     @Override
			     public boolean isTrusted(X509Certificate[] x509Certificates, String s) throws CertificateException {
			         return true;
			     }
			 });
			sslsf = new SSLConnectionSocketFactory(builder.build(), new String[]{"SSLv2Hello", "SSLv3", "TLSv1", "TLSv1.2"}, null, NoopHostnameVerifier.INSTANCE);
			 Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory> create()
		                .register("https", sslsf)
		                .register("http", new PlainConnectionSocketFactory())
		                .build();
		        connectionManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry);
		        connectionManager.setMaxTotal(200);
		        connectionManager.setDefaultMaxPerRoute(20);
		        //启动监控线程
		        Logger.info("--- 启动连接池连接监控线程");
		       new IdleConnectionMonitorThread(connectionManager).start();
         
         } catch (NoSuchAlgorithmException | KeyStoreException | KeyManagementException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        
       
        Logger.info("------ HttpConnectionManager init");
    }

    public CloseableHttpClient getHttpClient() {
        RequestConfig defaultRequestConfig;
        defaultRequestConfig = RequestConfig.custom().setConnectTimeout(2000).setSocketTimeout(2000).build();  
    	CookieStore cookieStore = new BasicCookieStore();
        CloseableHttpClient httpClient = HttpClients.custom()
        		.setDefaultCookieStore(cookieStore)
                .setConnectionManager(connectionManager)
                .setDefaultRequestConfig(defaultRequestConfig)
                .build();          
        
        /*CloseableHttpClient httpClient = HttpClients.createDefault();//如果不采用连接池就是这种方式获取连接*/
        return httpClient;
    }
    
    public void close(CloseableHttpResponse response) throws IOException {
    	if(response != null) {
    		response.close();
    	}
    }
    
    
   
    
    // 监控有异常的链接  
    private static class IdleConnectionMonitorThread extends Thread {

    	private final HttpClientConnectionManager connMgr;
        private volatile boolean shutdown;  

       
        
        public IdleConnectionMonitorThread(HttpClientConnectionManager connMgr) {  
            super();  
            this.connMgr = connMgr;  
        }  

        @Override
        public void run() {  
            try {  
                while (!shutdown) {  
                    synchronized (this) {  
                        wait(60000);
                        // 关闭失效的连接  
                        Logger.info(" 监控线程唤醒，即将关闭过期连接");
                        connMgr.closeExpiredConnections(); 
                        Logger.info(" 即将关闭30秒内闲置的连接");
                        // 可选的, 关闭30秒内不活动的连接  
                        connMgr.closeIdleConnections(30, TimeUnit.SECONDS);
                        Logger.info(" 操作完成 60秒后进行下一次操作。" );
                    }  
                }  
            } catch (InterruptedException ex) {
                ex.printStackTrace();  
            }  
        }  
    }  
}
