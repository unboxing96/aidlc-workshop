package com.tableorder.common.exception;

public class DuplicateException extends BusinessException {
    public DuplicateException(String message) { super("CONFLICT", message); }
}
