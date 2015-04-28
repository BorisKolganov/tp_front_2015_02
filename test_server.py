from flask import Flask, jsonify, request
from flask.ext.basicauth import BasicAuth


app = Flask(__name__,static_folder='public_html', static_url_path='')

app.config['BASIC_AUTH_USERNAME'] = 'test'
app.config['BASIC_AUTH_PASSWORD'] = 'test'
basic_auth = BasicAuth(app)

user = {'isAuth': False}



@app.route('/')
def hello_world():
    return app.send_static_file('index.html')

@app.route('/profile', methods=["POST"])
def profile():
	if user['isAuth'] == True :
		return jsonify(name=user['username'])
	else:
		return jsonify(name='you must authenticate')

@app.route('/login', methods=['POST'])
def login():
	json = request.get_json()
	if basic_auth.check_credentials(json['username'],json['password']):
		user.update({'username': 'boris', 'password': 'test', 'isAuth': True})
	return jsonify(name='Hi', json=json)

if __name__ == '__main__':
	app.debug = True
	app.run()