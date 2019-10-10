package com.cnki.njit.crawl.Entity;

public class PaperImp1 extends Paper {
    private String moreinfurl;
    private String authorinf;

    public PaperImp1()
    {
        super();
    }

    public PaperImp1(String moreinfurl, String authorinf) {
        this.moreinfurl = moreinfurl;
        this.authorinf = authorinf;
    }

    public PaperImp1(String papertitle, String authorinformation, String about, String key, Integer ref, Integer download, String moreinfurl, String authorinf) {
        super(papertitle, authorinformation, about, key, ref, download);
        this.moreinfurl = moreinfurl;
        this.authorinf = authorinf;
    }

    public String getMoreinfurl() {
        return moreinfurl;
    }

    public void setMoreinfurl(String moreinfurl) {
        this.moreinfurl = moreinfurl;
    }

    public String getAuthorinf() {
        return authorinf;
    }

    public void setAuthorinf(String authorinf) {
        this.authorinf = authorinf;
    }

    @Override
    public String toString() {
        return super.toString()+"PaperImp1{" +
                "moreinfurl='" + moreinfurl + '\'' +
                ", authorinf='" + authorinf + '\'' +
                '}';
    }
}
