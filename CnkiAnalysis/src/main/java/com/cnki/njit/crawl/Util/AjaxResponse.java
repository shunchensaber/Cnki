package com.cnki.njit.crawl.Util;

import com.google.gson.Gson;

import java.util.HashMap;
import java.util.Map;

public class AjaxResponse {

	private int status;
	private String info;
	private Map<String, Object> data;
	private static Gson gson = new Gson();
	
	public AjaxResponse(int status, String info) {
		this.status = status;
		this.info = info;
		this.data = new HashMap<String, Object>();
	}
	
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public Object getData() {
		return data;
	}
	public void setData(Map<String, Object> data) {
		this.data = data;
	}
	
	public void addDataItem(String key, Object value) {
		data.put(key, value);
	}
	
	public String toString() {
		if (data.isEmpty()) {
			data.put("info", null);
		}
		return gson.toJson(this);
	}
}
