# 12-bamazon
Bamazon!

* NPM Packages Used:
- mysql
- inquirer

There is a video walkthrough (NOTE - Movie is in Quicktime format) (without comentary) showing the following:

1. The node screen displaying all of the items in the data base prompting the user to choose which one to purchase.

2. The user is then prompted "how many would you like to buy"

3. when chosen the code checks the sql database to see how many of the chosen item is in stock and determins if there is enough in stock.

4. if there is NOT enough stock, a message is displayed telling the user there is not enough stock, and after a timer counts down the app is restarted

5. if there IS enough stock the requested purchasse amount is deducted from the stock on hand amount and the DB is updated to reflect the new on hand amount.

6. a total cost (and sales tax haha) are presented to the user and the app restarts to allow for more purchases.

7. the video also shows the SQL workbench which will reflect the updated stock quantity after a purchase was made.
