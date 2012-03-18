from flask import Flask, url_for

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return 'Hello World!'
