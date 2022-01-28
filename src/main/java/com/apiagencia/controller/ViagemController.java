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

import com.apiagencia.model.Viagem;
import com.apiagencia.repository.ViagemRepository;


@RestController
@RequestMapping(value="/viagem")
public class ViagemController {
	@Autowired
	private ViagemRepository viagemRepository;
	
	@GetMapping
	public List<Viagem> ListUsers(){
		return viagemRepository.findAll();
	}
	
	@GetMapping(value="{id}")
	public ResponseEntity<Viagem> FindByIdUser(@PathVariable int id){
		Optional<Viagem> viagem = viagemRepository.findById(id);
		if(viagem.isPresent()) {
			return new ResponseEntity<Viagem>(viagem.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}
	
	@PostMapping
	public Viagem CreateUser(@RequestBody Viagem viagem) {
		return viagemRepository.save(viagem);
	}
	
	@PutMapping
	public Viagem UpdateUser(@RequestBody Viagem viagem) {
		return viagemRepository.saveAndFlush(viagem);
	}
	
	@DeleteMapping(value ="{id}")
	public void DeleteUser(@PathVariable int id) {
		Optional<Viagem> viagem = viagemRepository.findById(id);
		if(viagem.isPresent()) {
			viagemRepository.deleteById(id);
		}else {
			new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
