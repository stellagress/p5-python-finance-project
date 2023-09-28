from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt
from sqlalchemy import CheckConstraint, text
from sqlalchemy.ext.hybrid import hybrid_property



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    email = db.Column(db.String, unique = True, nullable = False)
    _password_hash = db.Column(db.String)

    def __repr__(self):
        return f'<User {self.last_name}, {self.first_name}' 
    

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Not Authorized')
    

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')


    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    stocks_owned = db.relationship('Stock', backref='owner')
    

class Stock(db.Model, SerializerMixin):
    __tablename__ = 'stocks'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, unique = True)
    symbol = db.Column(db.String, unique = True)
    sector = db.Column(db.String)
    current_dividend_yield = db.Column(db.String)
    term_to_maturity = db.Column(db.String)
    market_percentage_variation = db.Column(db.String)

    def __repr__(self):
        return f'<User {self.name}, {self.symbol}' 
    
    owner = db.relationship('User', backref = 'stocks_owned')


class Portfolio(db.Model, SerializerMixin):
    __tablename__ = 'portfolios'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    stock_id = db.Column(db.Integer, db.ForeignKey('stocks.id'))
    shares_quantity = db.Column(db.Integer)
    price_per_share = db.Column(db.String)


    def __repr__(self):
        return f'<User {self.shares_quantity}, {self.price_per_share}' 



class Transaction(db.Model, SerializerMixin):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    stock_id = db.Column(db.Integer, db.ForeignKey('stocks.id'))
    transaction_type = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    def __repr__(self):
        return f'<User {self.transaction_type}' 



    














