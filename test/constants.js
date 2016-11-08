var CUSTOMERS_URL = 'http://localhost:8080/api/customers';
var ACCOUNTS_URL = 'http://localhost:8080/api/accounts';
var TRANSFERS_URL = "http://localhost:8080/api/transfers";
var DUMMY_CORRECT_CUSTOMER = {
    "first_name": "Stacy",
    "last_name": "Rivera",
    "address": {
        "street_number": "800",
        "street_name": "Blue Course Drive",
        "city": "State College",
        "state": "PA",
        "zip": "16802"
    }
};
var DUMMY_CORRECT_ACCOUNT = {
      "type": "Credit Card",
      "nickname": "string",
      "rewards": 0,
      "balance": 100.00,
      "account_number": "string",
};
var DUMMY_INCORRECT_ACCOUNT_2 = {
      "type": "Credit Card",
      "nickname": "string",
      "rewards": 0,
      "balance": -0.99,
      "account_number": "string",
};
var DUMMY_CORRECT_TRANSFER = {
        "type": "p2p",
        "sender": "",
        "receiver": "",
        "amount": 99.99,
        "description": "food"
};
var DUMMY_CORRECT_TRANSFER_1 = {
        "type": "p2p",
        "sender": "",
        "receiver": "",
        "amount": 100.01,
        "description": "change"
};
var DUMMY_INCORRECT_TRANSFER = {
        "type": "p2p",
        "sender": "",
        "receiver": "",
        "description": "food"
};
var DUMMY_INCORRECT_ACCOUNT = {
      "type": "Checking",
      "nickname": "ditto",
      "account_number": "string",
};
var DUMMY_CORRECT_ACCOUNT_1 = {
      "type": "Savings",
      "nickname": "string",
      "rewards": 0,
      "balance": 200.96,
      "account_number": "string",
};
var DUMMY_CORRECT_CUSTOMER_1 = {
    "first_name": "Bob",
    "last_name": "Dillion",
    "address": {
        "street_number": "888",
        "street_name": "Blue Course Drive",
        "city": "State College",
        "state": "PA",
        "zip": "16802"
    }
};
var DUMMY_INCORRECT_CUSTOMER = {
    "first_name": "Stacy",
    "address": {
        "street_number": "800",
        "street_name": "Blue Course Drive",
        "city": "State College",
        "state": "PA"
    }
};
var DUMMY_CORRECT_CUSTOMER_UPDATE = {
    "first_name": "Stacy",
    "last_name": "Carl",
    "address": {
        "street_number": "999",
        "street_name": "Blue Course Drive",
        "city": "State College",
        "state": "PA",
        "zip": "11111"
    }
};
module.exports = {
    CUSTOMERS_URL: CUSTOMERS_URL,
    ACCOUNTS_URL: ACCOUNTS_URL,
    TRANSFERS_URL: TRANSFERS_URL,
    DUMMY_CORRECT_CUSTOMER: DUMMY_CORRECT_CUSTOMER,
    DUMMY_CORRECT_ACCOUNT: DUMMY_CORRECT_ACCOUNT,
    DUMMY_INCORRECT_ACCOUNT_2: DUMMY_INCORRECT_ACCOUNT_2,
    DUMMY_CORRECT_TRANSFER: DUMMY_CORRECT_TRANSFER,
    DUMMY_CORRECT_TRANSFER_1: DUMMY_CORRECT_TRANSFER_1,
    DUMMY_INCORRECT_TRANSFER: DUMMY_INCORRECT_TRANSFER,
    DUMMY_CORRECT_ACCOUNT_1: DUMMY_CORRECT_ACCOUNT_1,
    DUMMY_INCORRECT_ACCOUNT: DUMMY_INCORRECT_ACCOUNT,
    DUMMY_CORRECT_CUSTOMER_UPDATE: DUMMY_CORRECT_CUSTOMER_UPDATE,
    DUMMY_CORRECT_CUSTOMER_1: DUMMY_CORRECT_CUSTOMER_1,
    DUMMY_INCORRECT_CUSTOMER: DUMMY_INCORRECT_CUSTOMER
};