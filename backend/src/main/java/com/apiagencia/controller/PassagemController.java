package com.apiagencia.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apiagencia.model.Passagem;
import com.apiagencia.model.Usuario;
import com.apiagencia.model.Viagem;
import com.apiagencia.repository.PassagemRepository;
import com.apiagencia.repository.ViagemRepository;
import com.apiagencia.security.JwtSecurity;

import io.jsonwebtoken.Claims;


@RestController
@RequestMapping(value="/passagem")
public class PassagemController {
	@Autowired
	private PassagemRepository passagemRepository;
	
	@Autowired 
	private ViagemRepository viagemRepository;
	
	@Autowired
	private JwtSecurity jwtSecurity;
	
	@GetMapping
	public List<Passagem> ListUsers(){
		return passagemRepository.findAll();
	}
	
	@GetMapping(value="{id}")
	public ResponseEntity<Passagem> FindByIdUser(@PathVariable int id){
		Optional<Passagem> passagem = passagemRepository.findById(id);
		if(passagem.isPresent()) {
			return new ResponseEntity<Passagem>(passagem.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}
	
	@PostMapping
	public Passagem CreateTicket(
			@RequestBody @Validated Passagem passagem, 
			@RequestHeader("Authorization") String authorizationToken) {
		
		String token = authorizationToken.split(" ")[1];		
		Claims usuario =  jwtSecurity.obterClaims(token);
	
		if(token == null) {
			throw new Error("Usuário não está autenticado");
		}
	
		Usuario usuarioAutenticado = new Usuario();
		
		int id = Integer.parseInt(usuario.get("id").toString());
	
		usuarioAutenticado.setId(id);
		usuarioAutenticado.setNome(usuario.get("nome").toString());
		usuarioAutenticado.setEmail(usuario.get("email").toString());
		usuarioAutenticado.setCpf(usuario.get("cpf").toString());
		//usuarioAutenticado.setTelefone(usuario.get("telefone").toString());
		//usuarioAutenticado.setImageUrl((usuario.get("imageUrl").toString()));
		
		passagem.setUsuario(usuarioAutenticado);
		
		boolean existViagem = viagemRepository.existsById(passagem.getViagem().getId());
		System.out.println(existViagem);
		
		if(!existViagem) {
			throw new Error("Viagem não cadastrada");
		}
		
		
		try {
			return passagemRepository.save(passagem);
			
		} catch (Exception e) {
			throw new Error("Error ao salvar: "+ e.getMessage());
		}
		
	}
	
	@PatchMapping(value="{id}")
	public Passagem UpdateUser(
			@PathVariable int id,
			@RequestBody @Validated Passagem passagem,
			@RequestHeader("Authorization") String authorizationToken) {
		
		String token = authorizationToken.split(" ")[1];
		Claims usuarioAutenticado = jwtSecurity.obterClaims(token);
		
		boolean existPassagem =  passagemRepository.existsById(id);
		
		if(!existPassagem) {
			throw new Error("Passagem informada não existe na base de dados");
		}
		
		Passagem passagemEncontrada = passagemRepository.getOne(id);
		
		Viagem viagem = passagem.getViagem();
		boolean existViagem = viagemRepository.existsById(viagem.getId());
		
		if(!existViagem) {
			throw new Error("Viagem não cadastrada");
		}
		
		
		Usuario usuario = new Usuario();
		usuario.setNome(usuarioAutenticado.get("nome").toString());
		usuario.setEmail(usuarioAutenticado.get("email").toString());
		usuario.setCpf(usuarioAutenticado.get("cpf").toString());
		int idUsuario = Integer.parseInt(usuarioAutenticado.get("id").toString());
		
		usuario.setId(idUsuario);
		
		Usuario usuarioId = passagemEncontrada.getUsuario();
		
		if( usuarioId.getId() != idUsuario) {
			throw new Error("Usuário sem permissão, ids diferentes ");
		}
		
		passagemEncontrada.setId(id);
		passagemEncontrada.setUsuario(usuario);
		passagemEncontrada.setViagem(passagem.getViagem());
		
		try {			
			return passagemRepository.saveAndFlush(passagemEncontrada);
		} catch (Exception e) {
			throw new Error("Não foi possível atualizar ");
		}
		
		
	}
	
	@DeleteMapping(value ="{id}")
	public void DeleteUser(
			@PathVariable int id,
			@RequestHeader("Authorization") String authorizationToken) {
		
		String token = authorizationToken.split(" ")[1];
		Claims usuarioAutenticado = jwtSecurity.obterClaims(token);
		
		boolean existPassagem = passagemRepository.existsById(id);
		
		if(!existPassagem) {
			throw new Error("Não existe essa passagem na base de dados ");
		}
		
		Passagem passagemSelecionada = passagemRepository.getOne(id);
		Usuario usuarioPassagem = passagemSelecionada.getUsuario();
		
		
		Optional<Passagem> passagem = passagemRepository.findById(id);
		if(passagem.isPresent() && 
				usuarioPassagem.getId() == Integer.parseInt(usuarioAutenticado.get("id").toString()) ) {
			passagemRepository.deleteById(id);
		}else {
			new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
