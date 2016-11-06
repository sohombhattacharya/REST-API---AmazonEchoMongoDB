var CUSTOMERS_URL = 'http://localhost:8080/api/customers';
var ACCOUNTS_URL = 'http://localhost:8080/api/accounts';
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
      "balance": 0,
      "account_number": "string",
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
      "balance": 0,
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
    DUMMY_CORRECT_CUSTOMER: DUMMY_CORRECT_CUSTOMER,
    DUMMY_CORRECT_ACCOUNT: DUMMY_CORRECT_ACCOUNT,
    DUMMY_CORRECT_ACCOUNT_1: DUMMY_CORRECT_ACCOUNT_1,
    DUMMY_INCORRECT_ACCOUNT: DUMMY_INCORRECT_ACCOUNT,
    DUMMY_CORRECT_CUSTOMER_UPDATE: DUMMY_CORRECT_CUSTOMER_UPDATE,
    DUMMY_CORRECT_CUSTOMER_1: DUMMY_CORRECT_CUSTOMER_1,
    DUMMY_INCORRECT_CUSTOMER: DUMMY_INCORRECT_CUSTOMER
};