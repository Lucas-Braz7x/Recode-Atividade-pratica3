package com.auth.api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.auth.api.error.ErrorAuth;
import com.auth.api.model.Usuario;
import com.auth.api.repositories.UsuarioRepository;
import com.auth.api.security.token;
import com.auth.api.service.JwtService;

@RestController
public class UsuarioController {
	
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private JwtService jwtService;
	
	public UsuarioController(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}
	
	@Autowired //Injeta a inicialização 
	private PasswordEncoder encoder;
	
	@GetMapping("/")
	public String home() {
		return "Home page";
	}
	
	@GetMapping("/usuario")
	public String usuario() {
		//token tokenAutenticado = new token(usuario)
		return "usuario autenticado";
	}
	
	@GetMapping("/admin")
	public String admin() {
		return "Admin page";
	}
	
	@PostMapping("/cadastro")
	public Usuario salvarUsuario(@RequestBody Usuario usuario) {
		boolean exist = usuarioRepository.existsByEmail(usuario.getEmail());
		if(exist == false) {
			throw new Error("Email já cadastrado");
		}
		cripoSenha(usuario);
		return usuarioRepository.save(usuario);
	}
	
	public void cripoSenha(Usuario usuario) {
		String senha = usuario.getSenha();
		String senhaCodificada = encoder.encode(senha);
		usuario.setSenha(senhaCodificada);
	}
	
	
	@PostMapping("/usuario/autenticar")
	public ResponseEntity<?> autenticar(@RequestBody Usuario usuario) {
		try {
			Usuario usuarioAutenticado = autenticarUsuario(usuario.getEmail(), usuario.getSenha());
			String tokenUsuario = jwtService.gerarToken(usuarioAutenticado);
			token tokenUsuarioAutenticado = new token(usuarioAutenticado.getNome(), tokenUsuario);
			return ResponseEntity.ok(tokenUsuario);
		}catch(ErrorAuth e){
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	public Usuario autenticarUsuario(String email, String senha) {
		Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
		if(!usuario.isPresent()) {
			throw new ErrorAuth("Usuário não encontrado");
		}
		
		boolean senhaIsEquals = encoder.matches(senha, usuario.get().getSenha());
		
		if(!senhaIsEquals) {
			throw new ErrorAuth("Senha inválida");
		}
		return usuario.get();
	}
	
	
	
	
	

}
