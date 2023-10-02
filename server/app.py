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




@app.route('/')
def index():
    return '<h1>Project Server</h1>'



















if __name__ == '__main__':
    app.run(port=5555, debug=True)