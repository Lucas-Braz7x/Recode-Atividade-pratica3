package com.auth.api.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth.api.model.Usuario;
import com.auth.api.security.SecurityUserDetailsService;
import com.auth.api.service.JwtService;

public class JwtTokenFilter extends OncePerRequestFilter{

	private SecurityUserDetailsService userDetailsService;
	private JwtService jwtService;

	public JwtTokenFilter(JwtService jwtService, 
			SecurityUserDetailsService userDetailsService) {
				this.jwtService = jwtService;
				this.userDetailsService = userDetailsService;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response,
			FilterChain filterChain)
			throws ServletException, IOException {
		
		String authorization = request.getHeader("Authorization");
		
		if(authorization != null && authorization.startsWith("Bearer")) {
			String token = authorization.split(" ")[1];
			boolean isTokenValid = jwtService.isTokenValido(token);
			
			if(isTokenValid) {
				String login = jwtService.obertLoginUsuario(token);
				UserDetails usuarioAutenticado = userDetailsService.loadUserByUsername(login);
				UsernamePasswordAuthenticationToken user = new UsernamePasswordAuthenticationToken(
						usuarioAutenticado, 
						null, 
						usuarioAutenticado.getAuthorities());
				
				user.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));;
				SecurityContextHolder.getContext().setAuthentication(user);
				
			}
		}
		filterChain.doFilter(request, response);
	}
	
}
