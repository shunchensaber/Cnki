package com.cnki.njit.crawl.Entity;

public class Paper {

    private String  papertitle;
    private String authorinformation;
    private String about;
    private String key;
    private Integer ref;
    private Integer download;

    public Paper() {
    }

    public Paper(String papertitle, String authorinformation, String about, String key, Integer ref, Integer download) {
        this.papertitle = papertitle;
        this.authorinformation = authorinformation;
        this.about = about;
        this.key = key;
        this.ref = ref;
        this.download = download;
    }

    public String getPapertitle() {
        return papertitle;
    }

    public void setPapertitle(String papertitle) {
        this.papertitle = papertitle;
    }

    public String getAuthorinformation() {
        return authorinformation;
    }

    public void setAuthorinformation(String authorinformation) {
        this.authorinformation = authorinformation;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Integer getRef() {
        return ref;
    }

    public void setRef(Integer ref) {
        this.ref = ref;
    }

    public Integer getDownload() {
        return download;
    }

    public void setDownload(Integer download) {
        this.download = download;
    }

    @Override
    public String toString() {
        return "Paper{" +
                "papertitle='" + papertitle + '\'' +
                ", authorinformation='" + authorinformation + '\'' +
                ", about='" + about + '\'' +
                ", key='" + key + '\'' +
                ", ref=" + ref +
                ", download=" + download +
                '}';
    }
}
