package com.nishida.testedevelcode.controller;

import java.util.ArrayList;
import java.util.List;

import com.nishida.testedevelcode.repository.UsuarioRepository;
import com.nishida.testedevelcode.model.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
// @RequestMapping("/api")
public class UsuarioController {

	@Autowired
	UsuarioRepository usuarioRepository;

	@GetMapping("/usuarios")
	public ResponseEntity<List<Usuario>> getAllUsuarios(@RequestParam(required = false) String nome) {
		try {
			List<Usuario> usuarios = new ArrayList<Usuario>();

			if (nome == null)
				usuarioRepository.findAll().forEach(usuarios::add);
			else
				usuarioRepository.findByNomeContaining(nome).forEach(usuarios::add);

      //Teste se há algum elemento na array. Caso não haja
			if (usuarios.isEmpty()) {
        //Retorna que não há nenhum conteúdo pelo status do HTTP
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
      //Caso haja, retorna o status de OK e a array com os usuarios
			return new ResponseEntity<>(usuarios, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/usuarios/{codigo}")
	public ResponseEntity<Usuario> getUsuarioByCodigo(@PathVariable("codigo") long codigo) {
		Usuario usuarioByCodigo = usuarioRepository.findByCodigo(codigo);

    //Se foi retornado algum usuario
		if (usuarioByCodigo != null) {
			return new ResponseEntity<>(usuarioByCodigo, HttpStatus.OK);
		} else {
      //Se não, retorna erro
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/usuarios")
	public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
    try {
			Usuario _usuario = usuarioRepository.save(new Usuario(usuario.getNome(), usuario.getDataNascimento(), usuario.getFoto()));
			return new ResponseEntity<>(_usuario, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/usuarios/{codigo}")
	public ResponseEntity<Usuario> updateUsuario(
    @PathVariable("codigo") long codigo, 
    @RequestBody Usuario usuario //Usuario com as alterações a serem feitas
    ) {
		Usuario usuarioByCodigo = usuarioRepository.findByCodigo(codigo);

    //Se há um usuário com aquele codigo
		if (usuarioByCodigo != null) {
			Usuario _usuario = usuarioByCodigo;
			_usuario.setNome(usuario.getNome());
			_usuario.setDataNascimento(usuario.getDataNascimento());
			_usuario.setFoto(usuario.getFoto());
			return new ResponseEntity<>(usuarioRepository.save(_usuario), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/usuarios/{codigo}")
	public ResponseEntity<HttpStatus> deleteUsuario(@PathVariable("codigo") long codigo) {
    Usuario usuarioByCodigo = usuarioRepository.findByCodigo(codigo);

    //Se existe um usuario com aquele codigo para ser deletado
    if(usuarioByCodigo != null){
      try {
        usuarioRepository.delete(usuarioByCodigo);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    //Se não
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
	}
}
