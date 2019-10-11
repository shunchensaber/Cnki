package com.cnki.njit.Constant;

public enum ResponseResultCode {
    SUCCESS(200), //成功
    FAIL(500),                  //失败
    UNAUTHORIZED(401),          //未认证（签名错误）
    BAD_REQUEST(400),          //输入错误
    USER_EXIST(4001),          //用户存在
    NOT_FOUND(404),             //接口不存在
    INTERNAL_SERVER_ERROR(500); //服务器内部错误
    private final int code;

    ResponseResultCode(int code) {
        this.code = code;
    }

    public int Code() {
        return code;
    }
}
