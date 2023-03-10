CREATE TABLE filmes(
	id INT GENERATED ALWAYS AS IDENTITY,
	titulo VARCHAR(255) NOT NULL,
	imagem VARCHAR(255),
	nota VARCHAR(5),
	tipo VARCHAR(45),
	id_api VARCHAR(45),
	id_usuario INT REFERENCES usuarios (id),
	PRIMARY KEY (id)
)

CREATE TABLE series(
	id INT GENERATED ALWAYS AS IDENTITY,
	titulo VARCHAR(255) NOT NULL,
	imagem VARCHAR(255),
	nota VARCHAR(5),
	tipo VARCHAR(45),
	id_api VARCHAR(45),
	id_usuario INT REFERENCES usuarios (id),
	PRIMARY KEY (id)
)

CREATE TABLE listaDesejo(
	id INT GENERATED ALWAYS AS IDENTITY,
	titulo VARCHAR(255) NOT NULL,
	imagem VARCHAR(255),
	nota VARCHAR(5),
	tipo VARCHAR(45),
	id_api VARCHAR(45),
	id_usuario INT REFERENCES usuarios (id),
	PRIMARY KEY (id)
)

CREATE TABLE usuarios (
	id INT GENERATED ALWAYS AS IDENTITY,
	nome VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	senha VARCHAR(45) NOT NULL,
	
	PRIMARY KEY (id)
)