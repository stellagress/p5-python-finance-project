# Investment Platform (SM Investments)

SM Investments is a place where users are able to access their account by logining in or signing up, entering a simulator platform that allow users to see their Portfolio, buy and sell stocks.  

For more information about Project Requirements, please check notes  
-[Notes](./notes/notes.md)

## Technologies
- JavaScript with React 
- Python
- SQLAlchemy
- SQLite
- Flask
- CSS/ HTML


## Installation Instructions
Please follow steps to start:
1. Fork and Clone repository to your local machine
2. cd into directory and open file
3. Install required Python packages:
* pipenv install 
* pipenv shell
4. Install required Node package (inside client directory):
* npm install 
5. Inside server directory:
* flask db upgrade
* python seed.py
* python app.py

## How to use the app
### 1. Accessing/ Creating an Account 

- In Home Page, users can either login or sign up.
- Users need to make sure that their information meets the validation requirements.  

### 2. Main Menu Option 1 - Portfolio: 

* New Users: Portfolio Page will inform user to acquire shares through 'Buy Stock' option in the main menu 
* Existing Users: Portfolio Page will display existing Portfolio 

### 3. Main Menu Option 2 - Buy Stocks:
* Buy Stocks - Page allow users to select shares from 20 different companies, which they will be able to select 
                quantity desired (1, 5, 10, 50, 100) and by clicking on 'Buy' users will see info added to Portfolio Page

### 4. Main Menu Option 3 - Sell Stocks:
* Sell Stocks - Page allow users to partially or entirely sell existing Portfolio/ Shares



## Contributor's Guide
Contributions are welcomed through forking and submitting pull requests.


## License
This project is licensed under the MIT License. See the 'LICENSE' file for more information.