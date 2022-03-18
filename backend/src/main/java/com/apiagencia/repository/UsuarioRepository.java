package com.apiagencia.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apiagencia.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
	boolean existsByEmail(String email);
	
	Optional<Usuario> findByEmail(String email);
	
	boolean existsByCpf(String cpf);
}
