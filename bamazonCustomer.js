// save and require Inquirer and MySQL packages
var inquirer = require("inquirer");
var mysql = require("mysql");

//set up connection to database
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    displayItems();
  });

  function displayItems () {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
      if (err) throw err;
      console.log(`Hi! Welcome to Bamazon! Please see below for a comprehensive listing of all of the items we sell! The ID of each item is listed first.`)
      res.forEach(element => {
        var item_id = element.item_id;
        var product_name = element.product_name;
        var price = element.price;
      console.log(`ID: #${item_id} - Product: ${product_name} for $${price}.00`);
      });
    //   connection.end();
    buyItem();
    });
  }

  function buyItem () {
    inquirer
    .prompt([
      // Ask user the ID of the product that they would like to buy
      {
        type: "input",
        message: "Please indicate the item that you wish to buy by entering the ID number from above.",
        name: "idNumber"
      },
      {
        type: "input",
        message: "Please indicate how many units of this product you would like to buy.",
        name: "units"
      }
    ]).then(function(input){
      idNumber = input.idNumber;
      units = Number(input.units);
  checkItemAvailability();
  });
}

function checkItemAvailability() {
  //check and update stock of item
  connection.query(`SELECT stock_quantity, price FROM products WHERE item_id=${idNumber}`, function(err, res) {
      if (err) throw err;
      var stock_quantity = res[0].stock_quantity;
      var price = res[0].price;
      var product = res[0].product_name;
      if (units < stock_quantity) {
          stockUpdate = stock_quantity - units;
          updateStock();
          console.log(`Thank you for your purchase! Your total is $${units*price}.`);
          connection.end();
          return
      } else {
          console.log(`We're sorry - your order could not be processed due to an insufficient quantity!`)
          connection.end();
          return
      }
  })
};

function updateStock() {
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {stock_quantity: stockUpdate},
      {item_id: idNumber},
    ],
    function(err, res) {
      if (err) throw err;
      console.log(`Inventory has been updated - please feel free to purchase another item below!`);
      console.log(`-----------------------------------------------------------------------------`);
    }
  );
  displayItems();
};