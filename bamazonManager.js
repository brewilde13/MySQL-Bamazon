var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection ({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw (err);
    displayMenu();
});

function displayMenu () {
    inquirer
    .prompt([
    {
        message: "Please choose from the following options!",
        type: "rawlist",
        name: "managerMenu",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
    ]).then(function(answers) {
        var userInput = answers.managerMenu;
        // console.log(userInput);
        if (userInput === "View Products for Sale") {
            displayProductsForSale();
        }
        else if (userInput === "View Low Inventory") {
            viewLowInventory();
        }
        else if (userInput === "Add to Inventory") {
            addToInventory();
        }
        else if (userInput === "Add New Product") {
            addNewProduct();
        }
        else {
            console.log("You did not select anything!")
        }
    });
}

function displayProductsForSale () {
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw (err);
        console.log("Welcome! Please see below for the inventory of your Bamazon segment!");
        res.forEach(element => {
            var item_id = element.item_id;
            var product_name = element.product_name;
            var price = element.price;
            var stock_quantity = element.stock_quantity;
            console.log(`ID # ${item_id} - Product: ${product_name} for $${price} and ${stock_quantity} units remaining`);
        });
        displayMenu();
    })
}

function viewLowInventory () {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 200", function(err,res){
        if (err) throw (err);
        res.forEach(element => {
            var item_id = element.item_id;
            var product_name = element.product_name;
            var stock_quantity = element.stock_quantity;
            console.log(`ID # ${item_id} - Product: ${product_name} only has ${stock_quantity} units remaining - you should refill!`);
        });
        displayMenu();
    })
}

// function addToInventory () {
//     connection.query()
// }