package com.auth.api.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth.api.model.Usuario;
import com.auth.api.service.JwtService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtSecurity implements JwtService {

	@Value("${jwt.expiracao}")//Pega a variável ambiente que está no ".properties"
	private String expiracao;
	
	@Value("${jwt.chave-assinatura}")
	private String chaveAssinatura;
	
	@Override
	public String gerarToken(Usuario usuario) {
		
		int exp = Integer.valueOf(expiracao);
		
		LocalDateTime dataHoraExpiracao = LocalDateTime.now().plusMinutes(exp);
		Instant instant = dataHoraExpiracao.atZone(ZoneId.systemDefault()).toInstant();
		
		Date data = Date.from(instant);
		
		String horaExpiracaoToken = dataHoraExpiracao.toLocalTime()
				.format(DateTimeFormatter.ofPattern("HH:mm"));
						
		
		String token = Jwts.builder()
								.setExpiration(data)
								.setSubject(usuario.getEmail())
								.claim("id", usuario.getId())
								.claim("nome", usuario.getNome())
								.claim("horaExpiracaoToken", horaExpiracaoToken)
								.signWith(SignatureAlgorithm.HS512, chaveAssinatura)
								.compact();
		
		return token;
	}

	//Pegas as informações do token
	@Override
	public Claims obterClaims(String token) throws ExpiredJwtException {
		
		return Jwts.parser()
						.setSigningKey(chaveAssinatura)
						.parseClaimsJws(token)
						.getBody();
	}

	//Verifica a validade do token
	@Override
	public boolean isTokenValido(String token) {
		try {
			Claims claims = obterClaims(token);
			Date dataExpiracao = claims.getExpiration();
			LocalDateTime dataExpiracaoFormatada = dataExpiracao.toInstant()
					.atZone(ZoneId.systemDefault()).toLocalDateTime(); 
			boolean dataHoraAtualIsAfter = LocalDateTime.now().isAfter(dataExpiracaoFormatada);
			return !dataHoraAtualIsAfter;
		} catch (ExpiredJwtException e) {
			return false;
		}
	}

	//Pega o usuário logado pelo token
	@Override
	public String obertLoginUsuario(String token) {
		Claims claims = obterClaims(token);
		return claims.getSubject();
	}

}
