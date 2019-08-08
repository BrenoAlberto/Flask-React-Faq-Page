# NOTES FOR THE REVIEWER
Install the new packages 
...
cd api
pip install -r requirements.txt
...

# FAQ API

This API has an endpoint that returns frequently asked questions (FAQs).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Python 3.6+

You should use virtual environments when developing Python applications. Check [virtualenv](https://virtualenv.pypa.io/en/latest/) and [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/).

### Installing

First, clone the repository, then run

```
cd api/
```
If you are using virtual environments (strongly recommended, since your project dependencies and variables aren't shared with each other when you use them), run:
```
workon <your-virtual-environment>
```
To install project dependencies, run
```
pip install -r requirements.txt
```

## Testing
```
python tests.py
```

## Running

```
flask run
```
This will start the application on http://localhost:5000.

## What you should do
You will see that this API returns always the same questions. They are hard-coded. However, we want questions to be read from the database.

For this, you should create a model named `Question` with the `question` and `answer` fields. Then, instead of returning hard-coded questions, the endpoint `/questions` should actually return the questions registered in the database.

It is recommended that you use an ORM such as [Flask-SQLAlchemy](https://https://flask-sqlalchemy.palletsprojects.com/en/2.x/) or [Peewee](http://docs.peewee-orm.com/en/latest/peewee/example.html) for dealing with SQL queries, so you don't need to write raw SQL queries on your Python application. To keep things simple, you may use SQLite.

Questions have a right order in which they appear to the users. For example, it may happen that question B should come before question A, even though question B was inserted later. The API should return them in this order.


Users must have a way of writing messages. You probably will have to create another model to store these messages, and create a POST endpoint that receives data from the client and creates it. The client must provide first name, last name, email and the message body. It may also provide a subject for the message, but that is optional.

Remember that your API shouldn't crash if the client sends wrong data. Return the right [HTTP codes](https://www.restapitutorial.com/httpstatuscodes.html).

Remember to write tests! There is an example in `tests.py`. When implementing your API, remember to update the tests and write new ones.

Your API will be consumed by [this page](https://gitlab.com/r13/faq-test/wikis/Wireframes), so use it as reference to what you need to implement.

If your application needs some additional setup, you should update this file with the new instructions!