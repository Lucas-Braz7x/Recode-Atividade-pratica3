package com.apiagencia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apiagencia.model.Viagem;

public interface ViagemRepository extends JpaRepository<Viagem, Integer>{

	boolean existsById(int id);
	
}
