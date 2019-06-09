var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "BonanzaN231S",
  database: "bamazon"
});


// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  resetVars();
});
//  Global variable declarations
function resetVars() {
  var itemLookup;
  var requested = 0;
  var onHand = 0
  var itemName = "";
  recID = 0;
  totalPrice = 0;
};
start();
// function which prompts the user for what action they should take
function start() {
  console.log("\033c");
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          id: "id",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
              // console.log("name " + results[i].product_name + " qty " + results[i].stock_qty);
            }
            return choiceArray;

          },
          message: "what item number do you want to buy?"
        },
        {
          name: "units",
          type: "input",
          message: "How many units do you want to buy",
        }
      ])
      .then(function (answer) {
        // lookup item to get details and see if there is sufficient stock to purchase
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            requested = answer.units;
            onHand = results[i].stock_qty;
            itemName = results[i].product_name;
            recID = i;
            totalPrice = results[i].price;
            console.log("\nAmount Requested to Buy: " + requested + "\n");
            console.log("Amount on Hand: " + onHand + "\n");
            checkStock();
          }
        }
      });
  });
}
function checkStock() {
  if (onHand < requested) {
    console.log("I'm sorry but the maximum amount we have in stock is " + onHand + ".\n\nI will now restart the application in 5 seconds, please wait." + "\n");
    setTimeout (start, 5000);
    return;
  } else {
    decreaseStock();
    return;
  }
}
function decreaseStock() {
  recID++;
  var newStockQty = (onHand - requested);
    connection.query("UPDATE bamazon.products SET ? WHERE ?",
    [
      {
        stock_qty: newStockQty
      },
      {
        item_id: recID
      },
    ],
      function (err) {
        if (err) throw err;
        // output to the 
        console.log("I have logged your order of quantity " + requested + " of item " + itemName + "\n");
        console.log("This leaves the store with a remaining balance of " + (onHand - requested) + "\n");
        console.log("The total cost of this purchase is: $" + Math.round((totalPrice * requested) * 100) / 100 + "\n")
        console.log("Let's not forget the governments portion of sales tax: $" + Math.round(((totalPrice * requested) * .0775) * 100) / 100 + "\n")
        console.log("Your new grand total for this purchase is $" + Math.round(((totalPrice * requested) * 1.0775) * 100) / 100 + "\n")
        console.log("please stand by and I will restart the app in 10 seconds.\n")
        setTimeout (start, 7000);
    return;
      }
  );
};