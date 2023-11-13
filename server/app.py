from flask import request, make_response, session, jsonify, Blueprint
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Stock, Portfolio, Transaction, PortfolioStock

# Resources:

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



class PortfolioStocks(Resource):
    def delete(self, id, portfolio_id):
        
        conditional = PortfolioStock.query.filter_by(id=id, portfolio_id=portfolio_id).first() 


        db.session.delete(conditional)
        db.session.commit()
        return make_response('',204)
    
    def patch(self, id, portfolio_id):
        data = request.get_json()
        portfolio_stock = PortfolioStock.query.filter_by(id=id, portfolio_id=portfolio_id).first()

        if not portfolio_stock:
            return jsonify({'error': 'Portfolio stock not found'}), 404
        
        if 'shares_quantity' in data:
            portfolio_stock.shares_quantity = data['shares_quantity']

        db.session.commit()
        return {'message': 'Portfolio stock updated successfully'}, 200
    


api.add_resource(PortfolioStocks, '/portst/<int:id>/portfolio/<int:portfolio_id>')





# ROUTES:

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
    session.pop('user_id', None)
    return {"message": "Logged out successfully"}, 200



@app.route('/sell/<int:portfolio_id>', methods=['GET'])
def get_stocks_to_sell(portfolio_id):
    portfolio = Portfolio.query.get(portfolio_id)
    if not portfolio:
        return jsonify({"error": "Portfolio not found"}), 404

    stocks = [portfolio_stock.stock for portfolio_stock in portfolio.portfolio_stocks]
    serialized_stocks = [stock.to_dict(only=('id', 'name', 'symbol', 'sector', 'current_dividend_yield',
                                             'market_percentage_variation')) for stock in stocks]
    return jsonify(serialized_stocks)



@app.route("/portfolio-stock", methods=["GET"])
def get_portfolio_stocks():
    portfolio_stocks = PortfolioStock.query.all()
    serialized_portfolio_stocks = [item.to_dict() for item in portfolio_stocks]
    return jsonify(serialized_portfolio_stocks)



@app.route('/user/<int:user_id>/portfolio/<int:portfolio_id>', methods=['POST'])
def add_portfolio_stock(user_id, portfolio_id):
    try:
        data = request.get_json()

        portfolio_stocks = []

        for item in data:
            portfolio_stock = PortfolioStock(
                portfolio_id=portfolio_id,
                stock_id=item['stock_id'],
                shares_quantity=item['shares_quantity'],
                price_per_share=item['price_per_share']
            )
            portfolio_stocks.append(portfolio_stock)

        db.session.add_all(portfolio_stocks)  # Use add_all to add a list of objects
        db.session.commit()

        return jsonify({'message': 'Portfolio stocks added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400



if __name__ == '__main__':
    app.run(port=5555, debug=True)
















# from flask import request, make_response, session, jsonify, Blueprint
# from flask_restful import Resource
# from sqlalchemy.exc import IntegrityError

# # Local imports
# from config import app, db, api
# # Add your model imports
# from models import User, Stock, Portfolio, Transaction, PortfolioStock

# # Resources:

# class Stocks(Resource):
#     def get(self):
#         stocks_list = [stock.to_dict() for stock in Stock.query.all()]
#         response = make_response(
#             stocks_list,
#             200,
#         )
#         return response
    
# api.add_resource(Stocks, "/stocks")



# def check_for_missing_values(data):
#     errors_list = []
#     for key, value in data.items():
#         if not value:
#             errors_list.append(f"{key} is required")
#     return errors_list

# class Users(Resource):
#     def post(self):
#         data = request.get_json()
#         errors = check_for_missing_values(data)
#         if len(errors) > 0:
#             return {"errors": errors}, 422

#         user = User(first_name=data['first_name'], last_name=data['last_name'], email=data['email'])
        
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

# api.add_resource(Users, '/users')



# class PortfolioStocks(Resource):
#     def delete(self, id, portfolio_id):
        
#         conditional = PortfolioStock.query.filter_by(id=id, portfolio_id=portfolio_id).first() 


#         db.session.delete(conditional)
#         db.session.commit()
#         return make_response('',204)
    
#     def patch(self, id, portfolio_id):
#         data = request.get_json()
#         portfolio_stock = PortfolioStock.query.filter_by(id=id, portfolio_id=portfolio_id).first()

#         if not portfolio_stock:
#             return jsonify({'error': 'Portfolio stock not found'}), 404
        
#         if 'shares_quantity' in data:
#             portfolio_stock.shares_quantity = data['shares_quantity']

#         db.session.commit()
#         return {'message': 'Portfolio stock updated successfully'}, 200
    


# api.add_resource(PortfolioStocks, '/portst/<int:id>/portfolio/<int:portfolio_id>')





# ROUTES:

# @app.route('/current_user', methods=["GET"])
# def get_current_user():
#     user = User.query.get(session["user_id"])
#     if user:
#         return user.to_dict(), 200
#     else:
#         return {"errors": ["User not found"]}, 404
    
        


# @app.route('/login', methods=["POST"])
# def login():
#     data = request.get_json()
#     user = User.query.filter(User.email == data['email']).first()
#     if user:
#         if user.authenticate(data['password']):
#             session["user_id"] = user.id 
#             return user.to_dict(), 200
#         else:
#             return {"errors": ["Username or password incorrect"]}, 401
#     else:
#         return {"errors": ["Username or password incorrect"]}, 401
    

# @app.route('/register', methods=["POST"])
# def register():
#     data = request.get_json()
#     errors = check_for_missing_values(data)
#     if len(errors) > 0:
#         return {"errors": errors}, 422

#     user = User(first_name=data['firstName'], last_name=data['lastName'], email=data['email'])
    
#     user.password_hash = data['password']
    
#     try:
#         db.session.add(user)
#         db.session.commit()
        
#         # Create a new portfolio for the user
#         portfolio = Portfolio(user_id=user.id)
#         db.session.add(portfolio)
#         db.session.commit()
        
#         session["user_id"] = user.id
#         return user.to_dict(), 201
        
#     except IntegrityError as e:
        
#         if isinstance(e, (IntegrityError)):
#             for error in e.orig.args:
#                 if "UNIQUE" in error:
#                     errors.append("Email already taken. Please try again")

#         return {'errors': errors}, 422

        

# @app.route('/portfolio/<int:portfolio_id>/stocks', methods=['GET'])
# def get_stocks_for_portfolio(portfolio_id):
#     portfolio = Portfolio.query.get(portfolio_id)
#     if not portfolio:
#         return jsonify({"error": "Portfolio not found"}), 404

#     stocks = [portfolio_stock.stock for portfolio_stock in portfolio.portfolio_stocks]
#     serialized_stocks = [stock.to_dict(only=('id', 'name', 'symbol', 'sector', 'current_dividend_yield',  
#                                              'market_percentage_variation')) for stock in stocks]
#     return jsonify(serialized_stocks)


# @app.route('/logout', methods=["DELETE"])
# def logout():
#     session.pop('user_id', None)
#     return {"message": "Logged out successfully"}, 200



# @app.route('/sell/<int:portfolio_id>', methods=['GET'])
# def get_stocks_to_sell(portfolio_id):
#     portfolio = Portfolio.query.get(portfolio_id)
#     if not portfolio:
#         return jsonify({"error": "Portfolio not found"}), 404

#     stocks = [portfolio_stock.stock for portfolio_stock in portfolio.portfolio_stocks]
#     serialized_stocks = [stock.to_dict(only=('id', 'name', 'symbol', 'sector', 'current_dividend_yield',
#                                              'market_percentage_variation')) for stock in stocks]
#     return jsonify(serialized_stocks)



# @app.route("/portfolio-stock", methods=["GET"])
# def get_portfolio_stocks():
#     portfolio_stocks = PortfolioStock.query.all()
#     serialized_portfolio_stocks = [item.to_dict() for item in portfolio_stocks]
#     return jsonify(serialized_portfolio_stocks)



# @app.route('/user/<int:user_id>/portfolio/<int:portfolio_id>', methods=['POST'])
# def add_portfolio_stock(user_id, portfolio_id):
#     try:
#         data = request.get_json()

#         portfolio_stocks = []

#         for item in data:
#             portfolio_stock = PortfolioStock(
#                 portfolio_id=portfolio_id,
#                 stock_id=item['stock_id'],
#                 shares_quantity=item['shares_quantity'],
#                 price_per_share=item['price_per_share']
#             )
#             portfolio_stocks.append(portfolio_stock)

#         db.session.add_all(portfolio_stocks)  # Use add_all to add a list of objects
#         db.session.commit()

#         return jsonify({'message': 'Portfolio stocks added successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': str(e)}), 400



# if __name__ == '__main__':
#     app.run(port=5555, debug=True)