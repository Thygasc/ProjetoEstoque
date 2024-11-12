from flask import Flask,jsonify

#Criando uma instancia Flask
app = Flask(__name__)

#Define uma rota principal
@app.route("/")
def home():
    return jsonify({"message":"Hello Flask"})

#Definir uma rota nova
@app.route("/api/teste")
def testeApi():
    data = {
        "id":1,
        "nome":"Exemplo de API flask",
        "descricao":"Exemplo de um microserviço com API FLASK em python."
    }
    return jsonify(data)



if __name__ == "__main__" :
    app.run(debug=True)
