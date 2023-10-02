#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

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


        users = [ 
            User(first_name="John", last_name="Doe", email="john@example.com"),
            User(first_name="Jane", last_name="Smith", email="jane@example.com"),
            User(first_name="Robert", last_name="Johnson", email="robert@example.com"),
            User(first_name="Emily", last_name="Wilson", email="emily@example.com"),
            User(first_name="Michael", last_name="Brown", email="michael@example.com"),
            User(first_name="Olivia", last_name="Davis", email="olivia@example.com"),
            User(first_name="William", last_name="Clark", email="william@example.com"),
            User(first_name="Sophia", last_name="Lee", email="sophia@example.com"),
            User(first_name="James", last_name="Taylor", email="james@example.com"),
            User(first_name="Ella", last_name="Anderson", email="ella@example.com"),
            User(first_name="Liam", last_name="Garcia", email="liam@example.com"),
            User(first_name="Ava", last_name="Martinez", email="ava@example.com"),
            User(first_name="Benjamin", last_name="Lopez", email="benjamin@example.com"),
            User(first_name="Mia", last_name="Harris", email="mia@example.com"),
            User(first_name="Henry", last_name="Allen", email="henry@example.com"),
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
        ]




        portfolios = [
            Portfolio(user_id=1),
            Portfolio(user_id=2),
            Portfolio(user_id=3),
            Portfolio(user_id=4),
            Portfolio(user_id=5),
            Portfolio(user_id=6),
            Portfolio(user_id=7),
        ]

        portfolio_stocks = [
            PortfolioStock(portfolio_id= 1, stock_id=2, shares_quantity = 50, price_per_share = 100),
            PortfolioStock(portfolio_id=1, stock_id=3, shares_quantity=25, price_per_share=150),
            PortfolioStock(portfolio_id=1, stock_id=4, shares_quantity=30, price_per_share=75),
            PortfolioStock(portfolio_id=2, stock_id=1, shares_quantity=20, price_per_share=200),
            PortfolioStock(portfolio_id=2, stock_id=2, shares_quantity=40, price_per_share=110),
            PortfolioStock(portfolio_id=2, stock_id=3, shares_quantity=10, price_per_share=160),
            PortfolioStock(portfolio_id=3, stock_id=4, shares_quantity=15, price_per_share=85),
            PortfolioStock(portfolio_id=3, stock_id=1, shares_quantity=60, price_per_share=190),
            PortfolioStock(portfolio_id=3, stock_id=3, shares_quantity=5, price_per_share=170),
            PortfolioStock(portfolio_id=4, stock_id=4, shares_quantity=20, price_per_share=80),
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


