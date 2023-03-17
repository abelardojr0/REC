from dotenv import load_dotenv
from Controle.classConexao import Conexao
from Controle.func import verificaSenha
load_dotenv()
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from psycopg2 import Error
from bcrypt import hashpw, gensalt, checkpw
from datetime import timedelta
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

try:
    con = Conexao(host=os.getenv("HOST"), user=os.getenv("USER"), password=os.getenv("PASSWORD"), port=os.getenv("PORT"), database=os.getenv("DATABASE"))   
        
    app = Flask(__name__)
    app.config['JWT_SECRET_KEY'] = 'fcfded42-c0fc-11ed-afa1-0242ac120002'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=15)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
    
    jwt = JWTManager(app)
    
    CORS(app)
    print("Conectado")
    
    @app.route("/")
    def home():
        return "API ainda não explodiu"
    
    @app.route("/filmes", methods =['GET' ,'POST'])
    @jwt_required()
    def consultarFilmes():      
      if(request.method == 'GET'):
        id = get_jwt_identity()
        sql = f"SELECT * FROM filmes WHERE id_usuario = '{id}'"
        results = con.querySelect(sql)               
        return results
      elif(request.method == 'POST'):
        titulo = request.json['titulo']
        id_usuario = get_jwt_identity()
        sql = f"SELECT * FROM filmes WHERE titulo = '{titulo}' AND id_usuario = '{id_usuario}'"
        resposta = con.querySelect(sql)[0]        
        if(resposta is None):
          return jsonify({'status' : 'fail'})
        else:
          return jsonify({'status' : 'sucess'})
          
    @app.route("/series", methods =['GET', 'POST'])
    @jwt_required()
    def consultarSeries():      
      if(request.method == 'GET'):
        id = get_jwt_identity()
        sql = f"SELECT * FROM series WHERE id_usuario = '{id}'"        
        results = con.querySelect(sql)
        return results
      elif(request.method == 'POST'):
        titulo = request.json['titulo']
        id_usuario = get_jwt_identity()
        sql = f"SELECT * FROM series WHERE titulo = '{titulo}' AND id_usuario = '{id_usuario}'"        
        resposta = con.querySelect(sql)
        if(resposta == []):
          return jsonify({'status' : 'fail'})
        else:
          return jsonify({'status' : 'sucess'})
    
    @app.route("/listaDesejo", methods =['GET'])
    @jwt_required()
    def consultarListaDesejo():
      id = get_jwt_identity()
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
    @jwt_required()
    def atualizar_user():        
        nome = request.json['nome']
        email = request.json['email']
        senha = request.json['senha']
        id_usuario = get_jwt_identity()
        if verificaSenha(senha):
          senha = senha.encode('utf-8')
          salt = gensalt()
          senha = hashpw(senha, salt).decode('utf-8')
          sql = f"UPDATE usuarios SET nome=%s, email =%s, senha=%s WHERE id = %s"
          values = (nome, email, senha, id_usuario)
          con.queryExecute(sql, values)        
          return jsonify({'status': 'success'})
        else:
          return jsonify({'status': 'senhaFraca'})
                        
    
    @app.route("/inserirFilme", methods =['POST'])
    @jwt_required()
    def inserirFilme():
      titulo = request.json['titulo']
      imagem = request.json['imagem']
      nota = request.json['nota']
      tipo = request.json['tipo']
      id_api = request.json['id_api']
      id_usuario = get_jwt_identity()
      sql = f"INSERT INTO filmes (titulo, imagem, nota, tipo, id_api, id_usuario) VALUES (%s, %s, %s, %s, %s, %s)"
      values = titulo, imagem, nota, tipo, id_api, id_usuario
      con.queryExecute(sql, values)           
      return jsonify({'status': 'sucess'})
    
    @app.route("/inserirSerie", methods =['POST'])
    @jwt_required()
    def inserirSerie():
      titulo = request.json['titulo']
      imagem = request.json['imagem']
      nota = request.json['nota']
      tipo = request.json['tipo']
      id_api = request.json['id_api']
      id_usuario = get_jwt_identity()      
      sql = f"INSERT INTO series (titulo, imagem, nota, tipo, id_api, id_usuario) VALUES (%s, %s, %s, %s, %s, %s)"
      values = titulo, imagem, nota, tipo, id_api, id_usuario
      con.queryExecute(sql, values)           
      return jsonify({'status': 'sucess'})
    
    @app.route("/inserirListaDesejo", methods =['POST'])
    @jwt_required()
    def inserirListaDesejo():
      titulo = request.json['titulo']
      imagem = request.json['imagem']
      nota = request.json['nota']
      tipo = request.json['tipo']
      id_api = request.json['id_api']
      id_usuario = get_jwt_identity()
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
    @jwt_required()
    def removerListaDesejo():
      titulo = request.json['titulo']
      id_usuario = get_jwt_identity()
      sql = f"SELECT * FROM listaDesejo WHERE titulo = '{titulo}' AND id_usuario = '{id_usuario}' "
      resposta = con.querySelect(sql)          
      if(resposta is []):
        return jsonify({'status' : 'fail'})
      else:
        sql = f"DELETE FROM listaDesejo WHERE titulo = '{titulo}'  AND id_usuario = '{id_usuario}'"
        con.queryExecute(sql, values=None)        
        return jsonify({'status': 'sucess'})
    
    @app.route("/removerFilme", methods = ['POST'])
    @jwt_required()
    def removerFilme():
      titulo = request.json['titulo']
      id_usuario = get_jwt_identity()
      sql = f"DELETE FROM filmes WHERE id_usuario = '{id_usuario}' AND titulo = '{titulo}'"
      con.queryExecute(sql, values=None)          
      return jsonify({'status' : 'sucess'})
    
    @app.route("/removerSerie", methods = ['POST'])
    @jwt_required()
    def removerSerie():
      titulo = request.json['titulo']
      id_usuario = get_jwt_identity()
      sql = f"DELETE FROM series WHERE id_usuario = '{id_usuario}' AND titulo = '{titulo}'"
      con.queryExecute(sql, values=None)      
      return jsonify({'status' : 'sucess'})
    
    @app.route("/deletarUsuario", methods = ['POST'])
    @jwt_required()
    def deletarUsuario():
      id_usuario = get_jwt_identity()
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