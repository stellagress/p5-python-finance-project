#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Stock, Portfolio, Transaction, PortfolioStock

# Views go here!

class Stocks(Resource):
    def get(self):
        stocks_list = [stock.to_dict() for stock in Stock.query.all()]
        response = make_response(
            stocks_list,
            200,
        )
        return response
    
api.add_resource(Stocks, "/stocks")



def check_for_missing_values(data):
    errors_list = []
    for key, value in data.items():
        if not value:
            errors_list.append(f"{key} is required")
    return errors_list

class Users(Resource):
    def post(self):
        data = request.get_json()
        errors = check_for_missing_values(data)
        if len(errors) > 0:
            return {"errors": errors}, 422

        user = User(first_name=data['first_name'], last_name=data['last_name'], email=data['email'])
        
        user.password_hash = data['password']
        
        try:
            db.session.add(user)
            db.session.commit()
            
            session["user_id"] = user.id
            return user.to_dict(), 201
            
        except IntegrityError as e:
            
            if isinstance(e, (IntegrityError)):
                for error in e.orig.args:
                    if "UNIQUE" in error:
                        errors.append("Email already taken. Please try again")

            return {'errors': errors}, 422

api.add_resource(Users, '/users')


@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter(User.email == data['email']).first()
    if user:
        if user.authenticate(data['password']):
            session["user_id"] = user.id 
            return user.to_dict(), 200
        else:
            return {"errors": ["Username or password incorrect"]}, 401
    else:
        return {"errors": ["Username or password incorrect"]}, 401
    

@app.route('/register', methods=["POST"])
def register():
        data = request.get_json()
        errors = check_for_missing_values(data)
        if len(errors) > 0:
            return {"errors": errors}, 422

        user = User(first_name=data['firstName'], last_name=data['lastName'], email=data['email'])
        
        user.password_hash = data['password']
        
        try:
            db.session.add(user)
            db.session.commit()
            
            session["user_id"] = user.id
            return user.to_dict(), 201
            
        except IntegrityError as e:
            
            if isinstance(e, (IntegrityError)):
                for error in e.orig.args:
                    if "UNIQUE" in error:
                        errors.append("Email already taken. Please try again")

            return {'errors': errors}, 422

@app.route('/')
def index():
    return '<h1>Project Server</h1>'



















if __name__ == '__main__':
    app.run(port=5555, debug=True)