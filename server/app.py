#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, jsonify, Blueprint
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
        # return jsonify(stocks_list), 200
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


@app.route('/current_user', methods=["GET"])
def get_current_user():
    user = User.query.get(session["user_id"])
    if user:
        return user.to_dict(), 200
    else:
        return {"errors": ["User not found"]}, 404
    
        


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
        
        # Create a new portfolio for the user
        portfolio = Portfolio(user_id=user.id)
        db.session.add(portfolio)
        db.session.commit()
        
        session["user_id"] = user.id
        return user.to_dict(), 201
        
    except IntegrityError as e:
        
        if isinstance(e, (IntegrityError)):
            for error in e.orig.args:
                if "UNIQUE" in error:
                    errors.append("Email already taken. Please try again")

        return {'errors': errors}, 422

        



# @app.route('/register', methods=["POST"])
# def register():
#         data = request.get_json()
#         errors = check_for_missing_values(data)
#         if len(errors) > 0:
#             return {"errors": errors}, 422

#         user = User(first_name=data['firstName'], last_name=data['lastName'], email=data['email'])
        
#         user.password_hash = data['password']
        
#         try:
#             db.session.add(user)
#             db.session.commit()
            
#             session["user_id"] = user.id
#             return user.to_dict(), 201
            
#         except IntegrityError as e:
            
#             if isinstance(e, (IntegrityError)):
#                 for error in e.orig.args:
#                     if "UNIQUE" in error:
#                         errors.append("Email already taken. Please try again")

#             return {'errors': errors}, 422
        


        

# @app.route('/account/${portfolio_id}/portfolio', methods=["GET"])
# @app.route('/portfolio', methods=["GET"])
# def get_portfolio():
#     data = request.get_json()
#     portfolio = PortfolioStock.query.filter(PortfolioStock.portfolio_id == data['portfolio_id']).first()
#     if portfolio:
#         return portfolio.to_dict(), 200
        

#     else:
#         return {"errors": ["Portfolio not found"]}, 401


# @app.route('/portfolio', methods=["GET"])
# def get_portfolio():
#     portfolio_id = request.args.get('portfolio_id')
#     if portfolio_id:
#         portfolio = PortfolioStock.query.filter_by(PortfolioStock.portfolio_id == ['portfolio_id']).first()
#         if portfolio:
#             return portfolio.to_dict(), 200
#     return {"errors": ["Portfolio not found"]}, 401


# @app.route('/portfolio', methods=["GET"])
# def get_portfolio():
#     responses = PortfolioStock.query.all()
#     return make_response(
#         jsonify([response.to_dict() for response in responses]), 200
#     )

        

@app.route('/portfolio/<int:portfolio_id>/stocks', methods=['GET'])
def get_stocks_for_portfolio(portfolio_id):
    portfolio = Portfolio.query.get(portfolio_id)
    if not portfolio:
        return jsonify({"error": "Portfolio not found"}), 404

    stocks = [portfolio_stock.stock for portfolio_stock in portfolio.portfolio_stocks]
    serialized_stocks = [stock.to_dict(only=('id', 'name', 'symbol', 'sector', 'current_dividend_yield',  
                                             'market_percentage_variation')) for stock in stocks]
    return jsonify(serialized_stocks)


@app.route('/logout', methods=["DELETE"])
def logout():
    # Remove the user_id from the session
    session.pop('user_id', None)
    return {"message": "Logged out successfully"}, 200




# @app.route('/buy_stocks', methods=['GET'])
# def get_all_stocks():

#     all_stocks = []
#     for st in Stock.query.all():
#         st_dict = {
#             "name" : st.name,
#             "symbol" : st.symbol,
#             "sector" :st.sector
#         }
#         all_stocks.append(st_dict)
        
#         response = make_response(
#             jsonify(all_stocks),
#             200,
#         )
#     return response


# class Stocks(Resource):
#     def get(self):
#         all_stocks = []
#         for st in Stock.query.all():
#             st_dict = {
#                 "name": st.name,
#                 "symbol": st.symbol,
#                 "sector": st.sector
#             }
#             all_stocks.append(st_dict)

#         return all_stocks, 200
#     api.add_resource(GetAllStocks, '/buy_stocks')


    # portfolio = Portfolio.query.get(portfolio_id)
    # if not portfolio:
    #     return jsonify({"error": "Portfolio not found"}), 404

    # stocks = [portfolio_stock.stock for portfolio_stock in portfolio.portfolio_stocks]
    # serialized_stocks = [stock.to_dict(only=('id', 'name', 'symbol', 'sector', 'current_dividend_yield', 'term_to_maturity', 
    #                                          'market_percentage_variation')) for stock in stocks]
    # return jsonify(serialized_stocks)

  


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


@app.route('/sell/<int:portfolio_id>', methods=['GET'])
def get_stocks_to_sell(portfolio_id):
    portfolio = Portfolio.query.get(portfolio_id)
    if not portfolio:
        return jsonify({"error": "Portfolio not found"}), 404

    stocks = [portfolio_stock.stock for portfolio_stock in portfolio.portfolio_stocks]
    serialized_stocks = [stock.to_dict(only=('id', 'name', 'symbol', 'sector', 'current_dividend_yield',
                                             'market_percentage_variation')) for stock in stocks]
    return jsonify(serialized_stocks)






# class PortfolioStock(Resource):
#     def get(self):
#         port_st_list = [item.to_dict() for item in PortfolioStock.query.all()]
#         response = make_response(
#             port_st_list,
#             200
#         )
#         return response


# api.add_resource(PortfolioStock, "/portfolio-stock")

@app.route("/portfolio-stock", methods=["GET"])
def get_portfolio_stocks():
    portfolio_stocks = PortfolioStock.query.all()
    serialized_portfolio_stocks = [item.to_dict() for item in portfolio_stocks]
    return jsonify(serialized_portfolio_stocks)






# portfolio_stock_bp = Blueprint('portfolio_stock', __name__)
# @portfolio_stock_bp.route('/user/<int:user_id>/portfolio/<int:portfolio_id>', methods=['POST'])
# def add_portfolio_stock():
#     try:
#         data = request.get_json()
#         portfolio_stock = PortfolioStock(
#             portfolio_id=data['portfolio_id'],
#             stock_id=data['stock_id'],
#             shares_quantity=data['shares_quantity'],
#             price_per_share=data['price_per_share']
#         )    
#         db.session.add(portfolio_stock)
#         db.session.commit()
#         return jsonify(portfolio_stock.to_dict()), 201
#     except Exception as e:
#         return jsonify({'error': str(e)}), 400



@app.route('/user/<int:user_id>/portfolio/<int:portfolio_id>', methods=['POST'])
def add_portfolio_stock(user_id, portfolio_id):
    try:
        data = request.get_json()

        portfolio_stock = PortfolioStock(
            portfolio_id=portfolio_id,
            stock_id=data['stock_id'],
            shares_quantity=data['shares_quantity'],
            price_per_share=data['price_per_share']
        )

        db.session.add(portfolio_stock)
        db.session.commit()

        return jsonify(portfolio_stock.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400












if __name__ == '__main__':
    app.run(port=5555, debug=True)