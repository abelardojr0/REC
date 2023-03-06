import psycopg2
from psycopg2 import Error
from flask import Flask, jsonify, request
from flask_cors import CORS

try:
    con = psycopg2.connect(
      host="localhost",
      database="REC",
      user="postgres",
      password="123",
      port="5432"
    )
    app = Flask(__name__)
    
    CORS(app)
    print("Conectado")
    
    @app.route("/filmes", methods =['GET'])
    def consultarFilmes():
      cursor = con.cursor()
      cursor.execute("SELECT * FROM filmes")
      results = cursor.fetchall()
      return results
    
    @app.route("/usuarios", methods =['GET'])
    def consultarUsuarios():
      cursor = con.cursor()
      cursor.execute("SELECT * FROM usuario")
      results = cursor.fetchall()
      return results
    
    
    @app.route("/inserirFilme", methods =['POST'])
    def inserirFilme():
      cursor = con.cursor()
      titulo = request.json['titulo']
      imagem = request.json['imagem']
      nota = request.json['nota']
      tipo = request.json['tipo']
      id_api = request.json['id_api']
      cursor.execute('INSERT INTO filmes (titulo, imagem, nota, tipo, id_api) VALUES (%s, %s, %s, %s, %s)', (titulo, imagem, nota, tipo, id_api))
      con.commit()
      return jsonify({'status': 'sucess'})
    
    @app.route("/inserirUsuario", methods =['POST'])
    def inserirUsuario():
      cursor = con.cursor()
      usuario = request.json['usuario']
      email = request.json['email']
      senha = request.json['senha']
      cursor.execute('INSERT INTO usuario (usuario, email, senha) VALUES (%s, %s, %s)', (usuario, email, senha))
      con.commit()
      return jsonify({'status': 'sucess'})
        
    if __name__ == '__main__':
      app.run(debug=True)
except(Error) as error:
  print(error)