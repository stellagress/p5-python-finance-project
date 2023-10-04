#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import bcrypt

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Stock, Portfolio, Transaction, PortfolioStock
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

    
        engine = create_engine('sqlite:///data.db')


        Session = sessionmaker(bind=engine)
        session = Session()
            

        db.create_all()

        print("Clearing db")
        User.query.delete()
        Stock.query.delete()
        Portfolio.query.delete()
        Transaction.query.delete()
        PortfolioStock.query.delete()


        # def generate_password_hash(password):
        #     # Generate a salt and hash the password
        #     salt = bcrypt.gensalt()
        #     hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        #     return hashed_password.decode('utf-8')

        def generate_password_hash(password):
            # Hash the password without salt
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(rounds=12, prefix=b"2a"))
            return hashed_password.decode('utf-8')


        users = [
            User(first_name="John", last_name="Doe", email="john@example.com", _password_hash=generate_password_hash("password123")),
            User(first_name="Jane", last_name="Smith", email="jane@example.com", _password_hash=generate_password_hash("password456")),
            User(first_name="Robert", last_name="Johnson", email="robert@example.com", _password_hash=generate_password_hash("password789")),
            User(first_name="Emily", last_name="Wilson", email="emily@example.com", _password_hash=generate_password_hash("passwordabc")),
            User(first_name="Michael", last_name="Brown", email="michael@example.com", _password_hash=generate_password_hash("passworddef")),
            User(first_name="Olivia", last_name="Davis", email="olivia@example.com", _password_hash=generate_password_hash("pass123word")),
            User(first_name="William", last_name="Clark", email="william@example.com", _password_hash=generate_password_hash("password567")),
            User(first_name="Sophia", last_name="Lee", email="sophia@example.com", _password_hash=generate_password_hash("password890")),
            User(first_name="James", last_name="Taylor", email="james@example.com", _password_hash=generate_password_hash("passw456ord")),
            User(first_name="Ella", last_name="Anderson", email="ella@example.com", _password_hash=generate_password_hash("pa789ssword")),
            User(first_name="Liam", last_name="Garcia", email="liam@example.com", _password_hash=generate_password_hash("pa101112ssword")),
            User(first_name="Ava", last_name="Martinez", email="ava@example.com", _password_hash=generate_password_hash("pa131415ssword")),
            User(first_name="Benjamin", last_name="Lopez", email="benjamin@example.com", _password_hash=generate_password_hash("passwordefg")),
            User(first_name="Mia", last_name="Harris", email="mia@example.com", _password_hash=generate_password_hash("passhij6789word")),
            User(first_name="Henry", last_name="Allen", email="henry@example.com", _password_hash=generate_password_hash("pass10101112word")),
        ]


        stocks = [
            Stock(name="Apple Inc.", symbol="AAPL", sector="Technology", current_dividend_yield="1.20%", term_to_maturity="5 years", market_percentage_variation="1.20%"),
            Stock(name="Microsoft Corporation", symbol="MSFT", sector="Technology", current_dividend_yield="1.10%", term_to_maturity="4 years", market_percentage_variation="1.15%"),
            Stock(name="Amazon.com Inc.", symbol="AMZN", sector="Consumer Discretionary", current_dividend_yield="0.80%", term_to_maturity="3 years", market_percentage_variation="1.50%"),
            Stock(name="Alphabet Inc. (Class A)", symbol="GOOGL", sector="Communication Services", current_dividend_yield="1.40%", term_to_maturity="5 years", market_percentage_variation="1.10%"),
            Stock(name="Meta Platforms, Inc. (formerly Facebook)", symbol="META", sector="Communication Services", current_dividend_yield="1.30%", term_to_maturity="4 years", market_percentage_variation="1.40%"),
            Stock(name="Johnson & Johnson", symbol="JNJ", sector="Health Care", current_dividend_yield="2.40%", term_to_maturity="N/A", market_percentage_variation="0.80%"),
            Stock(name="Berkshire Hathaway Inc. (Class B)", symbol="BRK.B", sector="Financials", current_dividend_yield="1.80%", term_to_maturity="N/A", market_percentage_variation="0.90%"),
            Stock(name="Tesla, Inc.", symbol="TSLA", sector="Consumer Discretionary", current_dividend_yield="0.50%", term_to_maturity="N/A", market_percentage_variation="1.80%"),
            Stock(name="JPMorgan Chase & Co.", symbol="JPM", sector="Financials", current_dividend_yield="2.20%", term_to_maturity="N/A", market_percentage_variation="0.70%"),
            Stock(name="Walmart Inc.", symbol="WMT", sector="Consumer Staples", current_dividend_yield="1.70%", term_to_maturity="N/A", market_percentage_variation="0.60%"),
            Stock(name="Google Inc.", symbol="GOOG", sector="Technology", current_dividend_yield="1.25%", term_to_maturity="4 years", market_percentage_variation="1.30%"),
            Stock(name="Facebook, Inc.", symbol="FB", sector="Communication Services", current_dividend_yield="1.15%", term_to_maturity="3 years", market_percentage_variation="1.25%"),
            Stock(name="Procter & Gamble Co.", symbol="PG", sector="Consumer Staples", current_dividend_yield="2.00%", term_to_maturity="N/A", market_percentage_variation="0.70%"),
            Stock(name="Verizon Communications Inc.", symbol="VZ", sector="Communication Services", current_dividend_yield="4.00%", term_to_maturity="5 years", market_percentage_variation="0.90%"),
            Stock(name="AT&T Inc.", symbol="T", sector="Communication Services", current_dividend_yield="5.50%", term_to_maturity="N/A", market_percentage_variation="0.80%"),
            Stock(name="The Coca-Cola Company", symbol="KO", sector="Consumer Staples", current_dividend_yield="3.00%", term_to_maturity="N/A", market_percentage_variation="0.50%"),
            Stock(name="Pfizer Inc.", symbol="PFE", sector="Health Care", current_dividend_yield="3.50%", term_to_maturity="N/A", market_percentage_variation="0.60%"),
            Stock(name="Exxon Mobil Corporation", symbol="XOM", sector="Energy", current_dividend_yield="5.20%", term_to_maturity="5 years", market_percentage_variation="0.40%"),
            Stock(name="Intel Corporation", symbol="INTC", sector="Technology", current_dividend_yield="2.75%", term_to_maturity="4 years", market_percentage_variation="1.10%"),
            Stock(name="Cisco Systems, Inc.", symbol="CSCO", sector="Technology", current_dividend_yield="2.00%", term_to_maturity="3 years", market_percentage_variation="1.20%"),
        ]




        portfolios = [
            Portfolio(user_id=1),
            Portfolio(user_id=2),
            Portfolio(user_id=3),
            Portfolio(user_id=4),
            Portfolio(user_id=5),
            Portfolio(user_id=6),
            Portfolio(user_id=7),
            Portfolio(user_id=8),
            Portfolio(user_id=9),
            Portfolio(user_id=10),
            Portfolio(user_id=11),
            Portfolio(user_id=12),
            Portfolio(user_id=13),
            Portfolio(user_id=14),
            Portfolio(user_id=15),

        ]

        portfolio_stocks = [
            PortfolioStock(portfolio_id=1, stock_id=2, shares_quantity=50, price_per_share=100),
            PortfolioStock(portfolio_id=1, stock_id=3, shares_quantity=25, price_per_share=150),
            PortfolioStock(portfolio_id=1, stock_id=4, shares_quantity=30, price_per_share=75),
            PortfolioStock(portfolio_id=2, stock_id=1, shares_quantity=20, price_per_share=200),
            PortfolioStock(portfolio_id=2, stock_id=2, shares_quantity=40, price_per_share=110),
            PortfolioStock(portfolio_id=2, stock_id=3, shares_quantity=10, price_per_share=160),
            PortfolioStock(portfolio_id=3, stock_id=4, shares_quantity=15, price_per_share=85),
            PortfolioStock(portfolio_id=3, stock_id=1, shares_quantity=60, price_per_share=190),
            PortfolioStock(portfolio_id=3, stock_id=3, shares_quantity=5, price_per_share=170),
            PortfolioStock(portfolio_id=4, stock_id=4, shares_quantity=20, price_per_share=80),
            PortfolioStock(portfolio_id=4, stock_id=1, shares_quantity=15, price_per_share=180),
            PortfolioStock(portfolio_id=5, stock_id=2, shares_quantity=30, price_per_share=120),
            PortfolioStock(portfolio_id=5, stock_id=3, shares_quantity=15, price_per_share=140),
            PortfolioStock(portfolio_id=6, stock_id=4, shares_quantity=25, price_per_share=95),
            PortfolioStock(portfolio_id=6, stock_id=1, shares_quantity=10, price_per_share=210),
            PortfolioStock(portfolio_id=7, stock_id=2, shares_quantity=35, price_per_share=130),
            PortfolioStock(portfolio_id=7, stock_id=3, shares_quantity=20, price_per_share=160),
            PortfolioStock(portfolio_id=8, stock_id=4, shares_quantity=40, price_per_share=90),
            PortfolioStock(portfolio_id=9, stock_id=1, shares_quantity=45, price_per_share=175),
            PortfolioStock(portfolio_id=10, stock_id=2, shares_quantity=10, price_per_share=220),
            PortfolioStock(portfolio_id=11, stock_id=3, shares_quantity=18, price_per_share=155),
            PortfolioStock(portfolio_id=12, stock_id=2, shares_quantity=25, price_per_share=105),
            PortfolioStock(portfolio_id=13, stock_id=3, shares_quantity=35, price_per_share=165),
            PortfolioStock(portfolio_id=14, stock_id=4, shares_quantity=28, price_per_share=88),
            PortfolioStock(portfolio_id=15, stock_id=1, shares_quantity=22, price_per_share=195),
        ]





        transactions = [
            Transaction(user_id=1, stock_id=1, transaction_type="Buy", created_at=datetime(2023, 9, 1), updated_at=datetime(2023, 9, 1)),
            Transaction(user_id=1, stock_id=2, transaction_type="Sell", created_at=datetime(2023, 9, 2), updated_at=datetime(2023, 9, 2)),
            Transaction(user_id=2, stock_id=3, transaction_type="Buy", created_at=datetime(2023, 9, 3), updated_at=datetime(2023, 9, 3)),
            Transaction(user_id=2, stock_id=4, transaction_type="Sell", created_at=datetime(2023, 9, 4), updated_at=datetime(2023, 9, 4)),
            Transaction(user_id=3, stock_id=1, transaction_type="Buy", created_at=datetime(2023, 9, 5), updated_at=datetime(2023, 9, 5)),
            Transaction(user_id=3, stock_id=5, transaction_type="Sell", created_at=datetime(2023, 9, 6), updated_at=datetime(2023, 9, 6)),
            Transaction(user_id=4, stock_id=6, transaction_type="Buy", created_at=datetime(2023, 9, 7), updated_at=datetime(2023, 9, 7)),
            Transaction(user_id=4, stock_id=7, transaction_type="Sell", created_at=datetime(2023, 9, 8), updated_at=datetime(2023, 9, 8)),
            Transaction(user_id=5, stock_id=8, transaction_type="Buy", created_at=datetime(2023, 9, 9), updated_at=datetime(2023, 9, 9)),
            Transaction(user_id=5, stock_id=9, transaction_type="Sell", created_at=datetime(2023, 9, 10), updated_at=datetime(2023, 9, 10)),
            Transaction(user_id=6, stock_id=10, transaction_type="Buy", created_at=datetime(2023, 9, 11), updated_at=datetime(2023, 9, 11)),
            Transaction(user_id=6, stock_id=11, transaction_type="Sell", created_at=datetime(2023, 9, 12), updated_at=datetime(2023, 9, 12)),
            Transaction(user_id=7, stock_id=12, transaction_type="Buy", created_at=datetime(2023, 9, 13), updated_at=datetime(2023, 9, 13)),
            Transaction(user_id=7, stock_id=13, transaction_type="Sell", created_at=datetime(2023, 9, 14), updated_at=datetime(2023, 9, 14)),
        ]



        for user in users:
            db.session.add(user)

        for stock in stocks:
            db.session.add(stock)

        for portfolio in portfolios:
            db.session.add(portfolio)

        for transaction in transactions:
            db.session.add(transaction)

        for portfolio_stock in portfolio_stocks:
            db.session.add(portfolio_stock)

        db.session.commit()


