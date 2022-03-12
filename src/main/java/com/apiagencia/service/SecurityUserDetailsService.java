package com.apiagencia.service;

//import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import com.apiagencia.model.Usuario;
import com.apiagencia.repository.UsuarioRepository;


@Repository
public class SecurityUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UsuarioRepository usuarioRepository;

	//@Transactional
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Usuario usuarioEncontrado =  usuarioRepository.findByEmail(email)
									.orElseThrow(() -> new UsernameNotFoundException("Email não cadastrado"));
		
		User user = (User) User.builder()
								.username(usuarioEncontrado.getEmail())
								.password(usuarioEncontrado.getSenha())
								.roles("USER")
								.build();
		return user;
	}

}
