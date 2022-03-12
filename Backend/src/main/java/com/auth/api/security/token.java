package com.auth.api.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

//Classe base para gerar o token
@Getter
@Setter
@AllArgsConstructor
public class token {
	private String nome;
	private String token;
}
