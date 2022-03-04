package com.auth.api.security;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import com.auth.api.model.Usuario;
import com.auth.api.repositories.UsuarioRepository;

@Repository
public class SecurityUserDetailsService implements UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	/*@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}*/

	//Para pegar dados do BD
	@Transactional
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Usuario usuarioEncontrado = usuarioRepository
					.findByEmail(email)
					.orElseThrow(() -> new UsernameNotFoundException("Email não cadastrado"));
		
		//Dispensa a implementação da classe userDetails
		//Esse trecho tranforma em userDetails
		User user = (User) User.builder()
							.username(usuarioEncontrado.getEmail())
							.password(usuarioEncontrado.getSenha())
							.roles("USER")
							.build();
 		return user;
	}
	
}
