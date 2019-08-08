import os
import json
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from exceptions import ValidationError

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from flask_migrate import Migrate
migrate = Migrate(app, db)

from models import Question, Message

@app.route('/questions/')
@cross_origin()
def get_questions():
    questions = Question.query.all()

    return Response(json.dumps([question.to_json() for question in questions]), status=200)

@app.route('/message/', methods=['POST'])
@cross_origin()
def new_message():
    print(request.json['data'])
    message = Message()
    if request.json['data']:
        data = request.json['data']
        try:
            message = check_and_set_message(data)
        except ValidationError:
            return Response(status=400)
    try:
        db.session.add(message)
        db.session.commit()
    except:
        return Response(status=500)
    return Response(status=201)


def check_and_set_message(data):
    if 'first_name' not in data or 'last_name' not in data or 'email' not in data or 'message' not in data:
        raise ValidationError('post does not have a body')
    else:
        message = Message(
            first_name = data['first_name'],
            last_name = data['last_name'],
            email = data['email'],
            message = data['message']
        )
        if 'subject' in data:
            message.subject = data['subject']
        return message