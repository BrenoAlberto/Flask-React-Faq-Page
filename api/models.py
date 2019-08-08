from app import db
from exceptions import ValidationError

class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=False)

    def to_json(self):
        json_question = {
            'id': self.id,
            'question': self.question,
            'answer': self.answer
        }
        return json_question
        

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(64), nullable=False)
    message = db.Column(db.Text, nullable=False)
    subject = db.Column(db.String(64), nullable=True)