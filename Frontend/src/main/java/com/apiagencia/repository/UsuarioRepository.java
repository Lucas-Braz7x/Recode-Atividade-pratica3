package com.apiagencia.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.apiagencia.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

}
