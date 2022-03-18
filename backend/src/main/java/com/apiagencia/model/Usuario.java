package com.apiagencia.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data; //Gera os getters e setters de forma dinâmica

@Data
@Entity
public class Usuario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private String nome;
	
	@Column(nullable = false, unique = true, length = 100)
	private String email;
	
	@Column(nullable=false, length=11)
	private String telefone;
	
	@Column(nullable=false, length=11, unique = true)
	private String cpf;
	
	@Column(nullable=false)
	private String senha;
	
	private String imageUrl;
	
	
}
