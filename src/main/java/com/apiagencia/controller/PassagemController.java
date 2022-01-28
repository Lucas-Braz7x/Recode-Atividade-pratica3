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

import com.apiagencia.model.Passagem;
import com.apiagencia.repository.PassagemRepository;


@RestController
@RequestMapping(value="/passagem")
public class PassagemController {
	@Autowired
	private PassagemRepository passagemRepository;
	
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
	public Passagem CreateUser(@RequestBody Passagem passagem) {
		return passagemRepository.save(passagem);
	}
	
	@PutMapping
	public Passagem UpdateUser(@RequestBody Passagem passagem) {
		return passagemRepository.saveAndFlush(passagem);
	}
	
	@DeleteMapping(value ="{id}")
	public void DeleteUser(@PathVariable int id) {
		Optional<Passagem> passagem = passagemRepository.findById(id);
		if(passagem.isPresent()) {
			passagemRepository.deleteById(id);
		}else {
			new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
