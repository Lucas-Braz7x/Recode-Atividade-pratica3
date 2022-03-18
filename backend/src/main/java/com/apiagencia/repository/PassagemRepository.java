package com.apiagencia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apiagencia.model.Passagem;

public interface PassagemRepository extends JpaRepository<Passagem, Integer> {

	boolean existsById(int id);
	
}
