# Investment Platform (SM Investments)

SM Investments is a platform where users can access their accounts by logging in or signing up. It provides a simulator platform that allows users to view their portfolio and buy/sell stocks.

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
Please follow steps to get started, up and running: 
1. Fork and git clone repository to your local machine
2. cd into directory and open file
3. Install required Python packages:
* pipenv install 
* pipenv shell
4. Install required Node packages (inside client directory):
* npm install 
* npm start
5. Inside server directory:
* flask db upgrade
* python seed.py
* python app.py

## How to use the app
### 1. Accessing/ Creating an Account 

- On Home Page, users can either log in or sign up.
- Users need to ensure that their information meets the validation requirements.  

### 2. Main Menu Option 1 - Portfolio: 

* New Users: Portfolio Page will guide user to acquire shares through 'Buy Stock' option in the main menu 
* Existing Users: Portfolio Page will display the existing Portfolio.

### 3. Main Menu Option 2 - Buy Stocks:
* Buy Stocks - The 'Buy Stocks' page allows users to select shares from 20 different companies. Users can choose the desired 
                quantity (1, 5, 10, 50, 100), and by clicking on 'Buy', the information will be added to the Portfolio Page.

### 4. Main Menu Option 3 - Sell Stocks:
* Sell Stocks - The 'Sell Stocks' page allows users to partially or entirely sell existing portfolio/shares.



## Contributor's Guide
Contributions are welcomed! You can contributed by forking and submitting pull requests.


## License
This project is licensed under the MIT License. See the 'LICENSE' file for more information.