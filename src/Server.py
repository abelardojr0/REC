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
    
    @app.route("/filmes/<int:id>", methods =['GET' ,'POST'])
    def consultarFilmes(id):
      cursor = con.cursor()
      if(request.method == 'GET'):
        cursor.execute("ROLLBACK")
        cursor.execute(f"SELECT * FROM filmes WHERE id_usuario = '{id}'")
        results = cursor.fetchall()
        return results
      elif(request.method == 'POST'):
        titulo = request.json['titulo']
        id_usuario = request.json['id_usuario']
        cursor.execute(f"SELECT * FROM filmes WHERE titulo = '{titulo}' AND id_usuario = '{id_usuario}'")
        resposta = cursor.fetchone()
        if(resposta is None):
          return jsonify({'status' : 'fail'})
        else:
          return jsonify({'status' : 'sucess'})
          
    @app.route("/series/<int:id>", methods =['GET', 'POST'])
    def consultarSeries(id):
      cursor = con.cursor()
      if(request.method == 'GET'):
        cursor.execute(f"SELECT * FROM series WHERE id_usuario = '{id}'")
        results = cursor.fetchall()
        return results
      elif(request.method == 'POST'):
        titulo = request.json['titulo']
        id_usuario = request.json['id_usuario']
        cursor.execute(f"SELECT * FROM series WHERE titulo = '{titulo}' AND id_usuario = '{id_usuario}'")
        resposta = cursor.fetchone()
        if(resposta is None):
          return jsonify({'status' : 'fail'})
        else:
          return jsonify({'status' : 'sucess'})
    
    @app.route("/listaDesejo/<int:id>", methods =['GET'])
    def consultarListaDesejo(id):
      cursor = con.cursor()
      cursor.execute(f"SELECT * FROM listaDesejo WHERE id_usuario = '{id}'")
      results = cursor.fetchall()
      return results
    
    @app.route("/usuarios", methods =['POST'])
    def checarUsuarios():
      cursor = con.cursor()
      email = request.json['email']
      senha = request.json['senha']
      cursor.execute(f"SELECT * FROM usuarios WHERE email = '{email}' AND senha = '{senha}' ")
      resposta = cursor.fetchone()
      if(resposta is None):
        return jsonify({'status' : 'fail'})
      else:
        return jsonify({'status' : 'sucess', 'id': f'{resposta[0]}', 'nome' : f'{resposta[1]}' })
      
    @app.route('/atualizarUsuario', methods=['POST'])
    def atualizar_user():
        cur = con.cursor()
        nome = request.json['nome']
        email = request.json['email']
        senha = request.json['senha']
        id_usuario = request.json['id_usuario']
        cur.execute("UPDATE usuarios SET nome=%s, email =%s, senha=%s WHERE id = %s", (nome, email, senha, id_usuario))
        con.commit()
        return jsonify({'status': 'success'})      
    
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
      cursor.execute(f"SELECT * FROM usuarios WHERE email = '{email}'")
      resposta = cursor.fetchone()
      if(resposta is None):
        cursor.execute('INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s)', (nome, email, senha))
        con.commit()
        return jsonify({'status': 'sucess'})
      else:  
        return jsonify({'status': 'fail'})
    
    @app.route("/removerListaDesejo", methods =['POST'])
    def removerListaDesejo():
      cursor = con.cursor()
      titulo = request.json['titulo']
      id_usuario = request.json['id_usuario']
      cursor.execute(f"SELECT * FROM listaDesejo WHERE titulo = '{titulo}' AND id_usuario = '{id_usuario}' ")
      resposta = cursor.fetchone()
      if(resposta is None):
        return jsonify({'status' : 'fail'})
      else:
        cursor.execute(f"DELETE FROM listaDesejo WHERE titulo = '{titulo}'  AND id_usuario = '{id_usuario}'")
        con.commit()
        return jsonify({'status': 'sucess'})
    
    @app.route("/removerFilme", methods = ['POST'])
    def removerFilme():
      cursor = con.cursor()
      titulo = request.json['titulo']
      id_usuario = request.json['id_usuario']
      cursor.execute(f"DELETE FROM filmes WHERE id_usuario = '{id_usuario}' AND titulo = '{titulo}'")
      con.commit()
      
      return jsonify({'status' : 'sucess'})
    
    @app.route("/deletarUsuario", methods = ['POST'])
    def deletarUsuario():
      cursor = con.cursor()
      id_usuario = request.json['id_usuario']
      cursor.execute(f"DELETE FROM filmes WHERE id_usuario = '{id_usuario}'")
      cursor.execute(f"DELETE FROM series WHERE id_usuario = '{id_usuario}'")
      cursor.execute(f"DELETE FROM listaDesejo WHERE id_usuario = '{id_usuario}'")
      cursor.execute(f"DELETE FROM usuarios WHERE id = '{id_usuario}'")
      con.commit()
      return jsonify({'status' : 'sucess'})

      
    if __name__ == '__main__':
      app.run(debug=True)
except(Error) as error:
  print(error)