package com.apiagencia.error;

public class ErrorAuth extends RuntimeException {
	public ErrorAuth(String errorMessage) {
		super(errorMessage);
		
	}
}
