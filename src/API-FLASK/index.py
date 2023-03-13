from dotenv import load_dotenv
from Controle.classConexao import Conexao
from Controle.func import verificaSenha
load_dotenv()
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from psycopg2 import Error
from bcrypt import hashpw, gensalt, checkpw
from flask_jwt_extended import JWTManager, jwt_required, create_access_token

try:
    con = Conexao(host=os.getenv("HOST"), user=os.getenv("USER"), password=os.getenv("PASSWORD"), port=os.getenv("PORT"), database=os.getenv("DATABASE"))
        
    app = Flask(__name__)
    app.config['JWT_SECRET_KEY'] = 'fcfded42-c0fc-11ed-afa1-0242ac120002'
    jwt = JWTManager(app)
    
    CORS(app)
    print("Conectado")
    
    @app.route("/")
    def home():
        return "API ainda não explodiu"
    
    @app.route("/filmes/<int:id>", methods =['GET' ,'POST'])
    @jwt_required()
    def consultarFilmes(id):      
      if(request.method == 'GET'):
        sql = f"SELECT * FROM filmes WHERE id_usuario = '{id}'"
        results = con.querySelect(sql)        
        return results
      elif(request.method == 'POST'):
        titulo = request.json['titulo']
        id_usuario = request.json['id_usuario']
        sql = f"SELECT * FROM filmes WHERE titulo = '{titulo}' AND id_usuario = '{id_usuario}'"
        resposta = con.querySelect(sql)[0]        
        if(resposta is None):
          return jsonify({'status' : 'fail'})
        else:
          return jsonify({'status' : 'sucess'})
          
    @app.route("/series/<int:id>", methods =['GET', 'POST'])
    @jwt_required()
    def consultarSeries(id):      
      if(request.method == 'GET'):
        sql = f"SELECT * FROM series WHERE id_usuario = '{id}'"        
        results = con.querySelect(sql)
        return results
      elif(request.method == 'POST'):
        titulo = request.json['titulo']
        id_usuario = request.json['id_usuario']
        sql = f"SELECT * FROM series WHERE titulo = '{titulo}' AND id_usuario = '{id_usuario}'"        
        resposta = con.querySelect(sql)
        if(resposta == []):
          return jsonify({'status' : 'fail'})
        else:
          return jsonify({'status' : 'sucess'})
    
    @app.route("/listaDesejo/<int:id>", methods =['GET'])
    @jwt_required()
    def consultarListaDesejo(id):
      sql = f"SELECT * FROM listaDesejo WHERE id_usuario = '{id}'"
      results = con.querySelect(sql)      
      return results
    
    @app.route("/usuarios", methods =['POST'])    
    def checarUsuarios():
      email = request.json['email']
      senha = request.json['senha'].encode('utf-8')      
      sql = f"SELECT * FROM usuarios WHERE email = '{email}'"
      resposta = con.querySelect(sql)                 
      if(resposta == []):
        return jsonify({'status' : 'fail'})
      else:
        resposta = resposta[0]
        if checkpw(senha, resposta[3].encode('utf-8')):
          access_token = create_access_token(identity=resposta[0])       
          return jsonify({'status' : 'sucess', 'id': f'{resposta[0]}', 'nome' : f'{resposta[1]}', 'access_token': f'{access_token}'})        
        else:
          return jsonify({'status' : 'fail'})
    
    @app.route('/atualizarUsuario', methods=['POST'])
    def atualizar_user():        
        nome = request.json['nome']
        email = request.json['email']
        senha = request.json['senha']
        id_usuario = request.json['id_usuario']
        if verificaSenha(senha):
          senha = senha.encode('utf-8')
          salt = gensalt()
          senha = hashpw(senha, salt).decode('utf-8')
          sql = f"UPDATE usuarios SET nome=%s, email =%s, senha=%s WHERE id = %s"
          values = (nome, email, senha, id_usuario)
          con.queryExecute(sql, values)        
          return jsonify({'status': 'sucess'})
        else:
          return jsonify({'status': 'senhaFraca'})
                        
    
    @app.route("/inserirFilme", methods =['POST'])
    def inserirFilme():
      titulo = request.json['titulo']
      imagem = request.json['imagem']
      nota = request.json['nota']
      tipo = request.json['tipo']
      id_api = request.json['id_api']
      id_usuario = request.json['id_usuario']
      sql = f"INSERT INTO filmes (titulo, imagem, nota, tipo, id_api, id_usuario) VALUES (%s, %s, %s, %s, %s, %s)"
      values = titulo, imagem, nota, tipo, id_api, id_usuario
      con.queryExecute(sql, values)           
      return jsonify({'status': 'sucess'})
    
    @app.route("/inserirSerie", methods =['POST'])
    def inserirSerie():
      titulo = request.json['titulo']
      imagem = request.json['imagem']
      nota = request.json['nota']
      tipo = request.json['tipo']
      id_api = request.json['id_api']
      id_usuario = request.json['id_usuario']      
      sql = f"INSERT INTO series (titulo, imagem, nota, tipo, id_api, id_usuario) VALUES (%s, %s, %s, %s, %s, %s)"
      values = titulo, imagem, nota, tipo, id_api, id_usuario
      con.queryExecute(sql, values)           
      return jsonify({'status': 'sucess'})
    
    @app.route("/inserirListaDesejo", methods =['POST'])
    def inserirListaDesejo():
      titulo = request.json['titulo']
      imagem = request.json['imagem']
      nota = request.json['nota']
      tipo = request.json['tipo']
      id_api = request.json['id_api']
      id_usuario = request.json['id_usuario']
      sql = f"INSERT INTO listadesejo (titulo, imagem, nota, tipo, id_api, id_usuario) VALUES (%s, %s, %s, %s, %s, %s)"
      values = (titulo, imagem, nota, tipo, id_api, id_usuario)
      con.queryExecute(sql, values)       
      return jsonify({'status': 'sucess'})
    
    @app.route("/inserirUsuario", methods =['POST'])
    def inserirUsuario():
      nome = request.json['nome']
      email = request.json['email']
      senha = request.json['senha']           
      sql = f"SELECT * FROM usuarios WHERE email = '{email}';"
      resposta = con.querySelect(sql)                 
      if resposta == []:
        if verificaSenha(senha):
          senha = senha.encode('utf-8')
          salt = gensalt()
          senha = hashpw(senha, salt).decode('utf-8')
          sql = f"INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s);"
          values = (nome, email, senha)
          con.queryExecute(sql, values)               
          return jsonify({'status': 'sucess'})
        else:
          return jsonify({'status': 'senhaFraca'})
      else:  
        return jsonify({'status': 'fail'})
    
    @app.route("/removerListaDesejo", methods =['POST'])
    def removerListaDesejo():
      titulo = request.json['titulo']
      id_usuario = request.json['id_usuario']
      sql = f"SELECT * FROM listaDesejo WHERE titulo = '{titulo}' AND id_usuario = '{id_usuario}' "
      resposta = con.querySelect(sql)          
      if(resposta is []):
        return jsonify({'status' : 'fail'})
      else:
        sql = f"DELETE FROM listaDesejo WHERE titulo = '{titulo}'  AND id_usuario = '{id_usuario}'"
        con.queryExecute(sql, values=None)        
        return jsonify({'status': 'sucess'})
    
    @app.route("/removerFilme", methods = ['POST'])
    def removerFilme():
      titulo = request.json['titulo']
      id_usuario = request.json['id_usuario']
      sql = f"DELETE FROM filmes WHERE id_usuario = '{id_usuario}' AND titulo = '{titulo}'"
      con.queryExecute(sql, values=None)          
      return jsonify({'status' : 'sucess'})
    
    @app.route("/removerSerie", methods = ['POST'])
    def removerSerie():
      titulo = request.json['titulo']
      id_usuario = request.json['id_usuario']
      sql = f"DELETE FROM series WHERE id_usuario = '{id_usuario}' AND titulo = '{titulo}'"
      con.queryExecute(sql, values=None)      
      return jsonify({'status' : 'sucess'})
    
    @app.route("/deletarUsuario", methods = ['POST'])
    def deletarUsuario():
      id_usuario = request.json['id_usuario']
      sql = f'''DELETE FROM filmes WHERE id_usuario = '{id_usuario}';
      DELETE FROM series WHERE id_usuario = '{id_usuario}';
      DELETE FROM listaDesejo WHERE id_usuario = '{id_usuario}';
      DELETE FROM usuarios WHERE id = '{id_usuario}';'''
      con.queryExecute(sql, values=None)      
      return jsonify({'status' : 'sucess'})
    
    
    if __name__ == '__main__':
      app.run(debug=True)

except(Error) as error:
  print(error)

