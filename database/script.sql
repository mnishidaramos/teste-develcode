--Executar separadamente o seguinte comando
--para criar o banco
CREATE DATABASE dbase;

--Após o primeiro, executar este segundo 
--para criar a tabela no banco
CREATE TABLE usuario (
  "codigo" SERIAL PRIMARY KEY;
  "nome" TEXT;
  "data_nascimento" DATE;
  "foto" BYTEA;
);