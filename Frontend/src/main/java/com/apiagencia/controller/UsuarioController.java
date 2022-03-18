package com.apiagencia.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apiagencia.model.Usuario;
import com.apiagencia.repository.UsuarioRepository;

@RestController
@RequestMapping(value="/usuario")
public class UsuarioController {
	@Autowired
	private UsuarioRepository usuarioRepository;
	
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
	public Usuario CreateUser(@RequestBody Usuario usuario) {
		return usuarioRepository.save(usuario);
	}
	
	@PutMapping
	public Usuario UpdateUser(@RequestBody Usuario usuario) {
		return usuarioRepository.saveAndFlush(usuario);
	}
	
	@DeleteMapping(value ="{id}")
	public void DeleteUser(@PathVariable int id) {
		Optional<Usuario> usuario = usuarioRepository.findById(id);
		if(usuario.isPresent()) {
			usuarioRepository.deleteById(id);
		}else {
			new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
