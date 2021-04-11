package com.nishida.testedevelcode.model;

import javax.persistence.*;
// import java.awt.image.*;
// import javax.imageio.*;
import java.util.Date;

@Entity
@Table(name = "usuario")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long codigo;

	@Column(name = "nome")
	private String nome;

	@Column(name = "data_nascimento")
	private Date dataNascimento;

	@Column(name = "foto")
	private byte[] foto;

	//Construtores
	public Usuario() {}

	public Usuario (String nome, Date dataNascimento, byte[] foto) {
		this.nome = nome;
		this.dataNascimento = dataNascimento;
		// this.foto = foto;
	}

	//Get para codigo
	public Long getCodigo() {
		return codigo;
	}

	//Get e set para nome
	public String getNome() {
		return nome;
	}

	public void setNome(String nome){
		this.nome = nome;
	}

	//Get e set para data de nascimento
	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento){
		this.dataNascimento = dataNascimento;
	}

	// Get e set para foto
	public byte[] getFoto() {
		return foto;
	}

	public void setFoto(byte[] foto){
		this.foto = foto;
	}
}
