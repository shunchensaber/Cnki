package com.cnki.njit.crawl.Data;


import com.cnki.njit.Constant.ResponseResultCode;

public class ResponseResult {
    private ResponseResultCode code;
    private String message;
    private Object data;

    public ResponseResultCode getCode() {
        return code;
    }

    public ResponseResult setCode(ResponseResultCode code) {
        this.code = code;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public ResponseResult setMessage(String message) {
        this.message = message;
        return this;
    }

    public Object getData() {
        return data;
    }

    public ResponseResult setData(Object data) {
        this.data = data;
        return this;
    }
}
