package com.apiagencia.security;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Token {
	
	private String nome;
	
	private String token;
}
