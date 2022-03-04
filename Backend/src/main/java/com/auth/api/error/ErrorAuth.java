package com.auth.api.error;

public class ErrorAuth extends RuntimeException {
	public ErrorAuth(String errorMessage) {
		super(errorMessage);
		
	}
}
