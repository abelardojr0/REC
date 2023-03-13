from psycopg2 import connect, Error


class Conexao:
    def __init__(self, host, user, password, port, database):
        self.host = host
        self.user = user
        self.password = password
        self.port = port
        self.database = database
    
    def queryExecute(self, sql, values):

        try:
            con = connect(host=self.host, user=self.user, password=self.password, port=self.port, database=self.database)

            cursor = con.cursor()

            cursor.execute(sql, values)

            con.commit()

            cursor.close()

            con.close()

            return "Foi"
        
        except Error as error:
            return f"Ocorreu um erro {error}"
    
    def querySelect(self, sql):
        try:
            con = connect(host=self.host, user=self.user, password=self.password, port=self.port, database=self.database)
            
            cursor = con.cursor()
            
            cursor.execute(sql)

            resultado = cursor.fetchall()

            cursor.close()
            con.close()
            return resultado
        except Error as error:
            return f"Ocorreu um erro {error}"