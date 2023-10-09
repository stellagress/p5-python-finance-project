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
### 1. Viewing Current Inventory

- When you start the app, choose the "View Inventory" option from the main menu.
- You will see a list of all the nail products currently in the salon's inventory.

### 2. Updating Inventory

- To add or remove items from the inventory, select the "Update Inventory" option from the main menu.
- Follow the on-screen prompts to specify whether you want to add or remove items and provide the necessary details.

### 3. Placing an Order

- To order new products for the salon, select the "Place Order" option from the main menu.
- Enter the product name and quantity you wish to order when prompted.
- The app will record the order and update the inventory accordingly.


## Contributor's Guide
Contributions are welcomed through forking and submitting pull requests.


## License
This project is licensed under the MIT License. See the 'LICENSE' file for more information.