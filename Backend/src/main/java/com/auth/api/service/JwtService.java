package com.auth.api.service;

import org.springframework.stereotype.Service;

import com.auth.api.model.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;

public interface JwtService {
	
	String gerarToken(Usuario usuario);
	
	Claims obterClaims(String token) throws ExpiredJwtException;
	
	boolean isTokenValido(String token);
	
	String obertLoginUsuario(String token);
}
