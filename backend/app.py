import os
from flask import Flask, request, jsonify # import the Flask class from the flask module, request object
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__) # create an app instance with the name of the module or file

@app.after_request # after every request, this function will be called
def add_cors_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    return response

DB_FILE_PATH = os.path.join(
    os.path.dirname(__file__),
    "nylo.sqlite"
)

print(DB_FILE_PATH)

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_FILE_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    lastname = db.Column(db.String(30), nullable=False)
    user = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    
    def __repr__(self):
        return f"<User {self.user}>"
    
with app.app_context():
    db.create_all()
    print("Base de datos y tabla creada.")

@app.route("/") # at the end point /
def hello():
    return "Hola mundo!"

@app.route("/about") # at the end point /about
def about():
    return "Sobre nosotros"

@app.route("/contact", methods=['GET', 'POST']) # at the end point /contact
def contact():
    if request.method == 'POST':
        return "Formulario enviado", 201
    return "Pagina de contacto"

@app.route("/api/info") # at the end point /api/info
def api_info():
    data = {
        "version": "1.0.0",
        "nombre": "Nylo app"
    }
    return jsonify(data)
    
@app.route("/user/login", methods=['GET', 'POST'])
def login_user():
    content= request.get_json()
    
    username= content['username']
    password= content['password']
    
    user = db.session.query(User).filter_by(user=username).one_or_none()
    
    print(user)
    
    if user is None:
        return 'Usuario no encontrado', 404
    else:
        if user.password != password:
            return 'Contraseña incorrecta', 401
    
    return 'Login exitoso', 200

@app.route("/user/sing-up", methods=['GET', 'POST'])
def register_user():
    content= request.get_json()
    
    name= content['name']
    lastname= content['lastname']
    user= content['username']
    email= content['email']
    password= content['password']
    
    db_user= User(
        name=name,
        lastname=lastname,
        user=user,
        email=email,
        password=password
    )
    
    # db.session.add(db_user)
    # db.session.commit()
    
    print(db_user)
    
    return 'Creado el usuario', 200    
    
@app.route("/user/info")
def obtain_user():
    user = db.session.query(User).filter_by(id=1).one_or_none()
    userjson = {
        "id": user.id,
        "name": user.name,
        "lastname": user.lastname,
        "user": user.user,
        "email": user.email,
        "password": user.password
    }
    print(userjson)
    return userjson
    

if __name__ == "__main__": # on running python app.py
    app.run(debug=True) # run the flask app, the server will restart when code changes with debug=True. Also we can use flask run --debug command to run the app.