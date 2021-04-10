package com.nishida.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nishida.model.Usuario;

/**
  É possível usar metodos do JPARepository sem implementá-los, como save(), 
  findById(), findAll(), delete(), etc.
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
  Usuario findByCodigo(long codigo);

  List<Usuario> findByNomeContaining(String nome);

  void deleteByCodigo(Long codigo);
}
