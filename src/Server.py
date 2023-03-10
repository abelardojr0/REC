import psycopg2
from psycopg2 import Error
from flask import Flask, jsonify, request
from flask_cors import CORS

try:
    con = psycopg2.connect(
      host="localhost",
      database="REC",
      user="postgres",
      password="postgres",
      port="5432"
    )
    app = Flask(__name__)
    
    CORS(app)
    print("Conectado")
    
    @app.route("/filmes/<int:id>", methods =['GET'])
    def consultarFilmes(id):
      cursor = con.cursor()
      cursor.execute(f"SELECT * FROM filmes WHERE id_usuario = '{id}'")
      results = cursor.fetchall()
      return results
    
    @app.route("/series/<int:id>", methods =['GET'])
    def consultarSeries(id):
      cursor = con.cursor()
      cursor.execute(f"SELECT * FROM series WHERE id_usuario = '{id}'")
      results = cursor.fetchall()
      return results
    
    @app.route("/listaDesejo/<int:id>", methods =['GET'])
    def consultarListaDesejo(id):
      cursor = con.cursor()
      cursor.execute(f"SELECT * FROM listaDesejo WHERE id_usuario = '{id}'")
      results = cursor.fetchall()
      return results
    
    @app.route("/usuarios", methods =['GET'])
    def consultarUsuarios():
      cursor = con.cursor()
      cursor.execute("SELECT * FROM usuarios")
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
      id_usuario = request.json['id_usuario']
      cursor.execute("ROLLBACK")
      cursor.execute('INSERT INTO filmes (titulo, imagem, nota, tipo, id_api, id_usuario) VALUES (%s, %s, %s, %s, %s, %s)', (titulo, imagem, nota, tipo, id_api, id_usuario))
      con.commit()
      return jsonify({'status': 'sucess'})
    
    @app.route("/inserirSerie", methods =['POST'])
    def inserirSerie():
      cursor = con.cursor()
      titulo = request.json['titulo']
      imagem = request.json['imagem']
      nota = request.json['nota']
      tipo = request.json['tipo']
      id_api = request.json['id_api']
      id_usuario = request.json['id_usuario']
      cursor.execute("ROLLBACK")
      cursor.execute('INSERT INTO series (titulo, imagem, nota, tipo, id_api, id_usuario) VALUES (%s, %s, %s, %s, %s, %s)', (titulo, imagem, nota, tipo, id_api, id_usuario))
      con.commit()
      return jsonify({'status': 'sucess'})
    
    @app.route("/inserirListaDesejo", methods =['POST'])
    def inserirListaDesejo():
      cursor = con.cursor()
      print(request.json)
      titulo = request.json['titulo']
      imagem = request.json['imagem']
      nota = request.json['nota']
      tipo = request.json['tipo']
      id_api = request.json['id_api']
      id_usuario = request.json['id_usuario']
      cursor.execute("ROLLBACK")
      cursor.execute('INSERT INTO listaDesejo (titulo, imagem, nota, tipo, id_api, id_usuario) VALUES (%s, %s, %s, %s, %s, %s)', (titulo, imagem, nota, tipo, id_api, id_usuario))
      con.commit()
      return jsonify({'status': 'sucess'})
    
    @app.route("/inserirUsuario", methods =['POST'])
    def inserirUsuario():
      cursor = con.cursor()
      nome = request.json['nome']
      email = request.json['email']
      senha = request.json['senha']
      cursor.execute('INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s)', (nome, email, senha))
      con.commit()
      return jsonify({'status': 'sucess'})
    
    @app.route("/removerListaDesejo", methods =['POST'])
    def removerListaDesejo():
      cursor = con.cursor()
      id = request.json['id']
      cursor.execute("ROLLBACK")
      cursor.execute(f"DELETE FROM listaDesejo WHERE id = '{id}'")
      con.commit()
      return jsonify({'status': 'sucess'})
    if __name__ == '__main__':
      app.run(debug=True)
except(Error) as error:
  print(error)