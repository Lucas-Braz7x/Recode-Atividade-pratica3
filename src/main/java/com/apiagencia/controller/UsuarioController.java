package com.apiagencia.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import javax.servlet.annotation.MultipartConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.apiagencia.error.ErrorAuth;
import com.apiagencia.model.Usuario;
import com.apiagencia.repository.UsuarioRepository;
import com.apiagencia.security.JwtSecurity;
import com.apiagencia.security.Token;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping(value="/usuario")
public class UsuarioController {
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private JwtSecurity jwtSecurity;
	
	@Autowired 
	private PasswordEncoder encoder;
	
	@GetMapping
	public List<Usuario> ListUsers(){
		return usuarioRepository.findAll();
	}
	
	@GetMapping(value="{id}")
	public ResponseEntity<Usuario> FindByIdUser(@PathVariable int id){
		Optional<Usuario> usuario = usuarioRepository.findById(id);
		if(usuario.isPresent()) {
			return new ResponseEntity<Usuario>(usuario.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}
	
	@PostMapping
	public Usuario createUser(@RequestBody @Validated Usuario usuario) {
		boolean existEmail = usuarioRepository.existsByEmail(usuario.getEmail());
		boolean existCpf = usuarioRepository.existsByCpf(usuario.getCpf());
		if(existEmail) {
			throw new ErrorAuth("Email já cadastrado");
		}
		
		if(existCpf) {
			throw new ErrorAuth("Cpf já cadastrado");
		}
		
		cripoSenha(usuario);
		
		return usuarioRepository.save(usuario);
	}
	
	

	//Login
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody @Validated Usuario usuario) {
		try {
			Usuario usuarioAutenticado = autenticarUsuario(
					usuario.getEmail(),
					usuario.getSenha());
			String tokenUsuario = jwtSecurity.gerarToken(usuarioAutenticado);
			Token tokenAutenticado = new Token(
					usuarioAutenticado.getNome(),
					tokenUsuario);
			return ResponseEntity.ok(tokenUsuario);
		}catch(Exception e){
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	
	@PatchMapping(value ="{id}")
	public Usuario updateUser(
			@PathVariable int id, 
			@RequestBody @Validated Usuario usuario, 
			@RequestHeader("Authorization") String authorizationToken) {
		
		String tokenUsuario = authorizationToken.split(" ")[1];
		Usuario usuarioExistente = usuarioRepository.getOne(id);
		
		if(validarId(tokenUsuario, usuarioExistente.getId())) {
			if(usuario.getNome()!= null) {
				usuarioExistente.setNome(usuario.getNome());
			}
			if(usuario.getEmail()!= null) {
				if(!usuarioRepository.existsByEmail(usuario.getEmail())) {
					usuarioExistente.setEmail(usuario.getEmail());					
				}else {
					throw new Error("Email já existe na base de dados");
				}
			}
			if(usuario.getCpf()!= null)  {
				if(!usuarioRepository.existsByCpf(usuario.getCpf())) {
					usuarioExistente.setCpf(usuario.getCpf());					
				}else {
					throw new Error("Cpf já existe na base de dados");
				}
			}
			if(usuario.getTelefone()!= null) {
				usuarioExistente.setTelefone(usuario.getTelefone());
			}
			if(usuario.getSenha()!= null) {
				usuarioExistente.setSenha(usuario.getSenha());
			}
			if(usuario.getImageUrl()!= null) {
				usuarioExistente.setImageUrl(usuario.getImageUrl());
			}
			
			System.out.println(usuarioExistente);
			return usuarioRepository.saveAndFlush(usuarioExistente);			
		}else {
			throw new Error("Não foi possível atualizar, id diferentes");
		}
		
		
	}
	
	@DeleteMapping(value ="{id}")
	public void deleteUser(
			@PathVariable int id,
			@RequestHeader("Authorization") String authorizationToken) {
		
		String token = authorizationToken.split(" ")[1];
		
		Optional<Usuario> usuario = usuarioRepository.findById(id);
		if(usuario.isPresent() && validarId(token, id) ) {
			usuarioRepository.deleteById(id);
		}else {
			throw new Error("Sem permissão para excluir este usuário");
		}
	}
	
	/*
	 * Métodos
	 * */
	
	public void cripoSenha(Usuario usuario) {
		String senha = usuario.getSenha();
		String senhaCodificada = encoder.encode(senha);
		usuario.setSenha(senhaCodificada);
	}
	
	public Usuario autenticarUsuario(String email, String senha) {
		Optional<Usuario> doador = usuarioRepository.findByEmail(email);
		if(!doador.isPresent()) {
			throw new ErrorAuth("Usuário não encontrado, informe outro email");
		}
		
		//Compara as senhas
		//Primeira entrada a senha recebida, segunda a senha no banco de dados
		boolean senhaIsEquals = encoder.matches(senha, doador.get().getSenha());
		
		if(!senhaIsEquals) {
			throw new ErrorAuth("Senha inválida");
		}
		return doador.get();
	}
	
	public boolean validarId(String token, int id) {
		Claims doadorToken = jwtSecurity.obterClaims(token);
		int doadorTokenId = Integer.parseInt(doadorToken.get("id").toString());
		
		System.out.println("id = " + id);
		System.out.println("id = " + doadorTokenId);
		
		if( doadorTokenId == id) {
			return true;
		}
		
		return false;
	}
	
	
}
