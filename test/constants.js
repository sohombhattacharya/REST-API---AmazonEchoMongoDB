var CUSTOMERS_URL = 'http://localhost:8080/api/customers';
var SPEC_CUSTOMER_URL = "http://localhost:8080/api/customers/57f5aeb9360f81f104543a7176587658765876590"; 
var SPEC_CUSTOMER_FRIENDS_URL = "http://localhost:8080/api/customers/57f5aeb9360f81f104543a7176587658765876590/friends"; 
var FRIEND1 = "57f5aeb9360f81f104543a7176587658765876591"; 
var FRIEND2 = "57f5aeb9360f81f104543a7176587658765876590";
var CORRECT_CUSTOMER_SPEC_FRIEND_URL_1 = "http://localhost:8080/api/customers/" + FRIEND1 + "/friends/" + FRIEND2;
var CORRECT_CUSTOMER_SPEC_FRIEND_URL_2 = "http://localhost:8080/api/customers/" + FRIEND2 + "/friends/" + FRIEND1;
var INCORRECT_CUSTOMER_SPEC_FRIEND_URL = "http://localhost:8080/api/customers/57f5aeb9360f81f104543a7176587658765876591/friends/000000000";
var INCORRECT_CUSTOMER_CORRECT_SPEC_FRIEND_URL = "http://localhost:8080/api/customers/000000000/friends/57f5aeb9360f81f104543a7176587658765876591"
var INCORRECT_SPEC_CUSTOMER_FRIENDS_URL = "http://localhost:8080/api/customers/0000000000000/friends"; 
var INCORRECT_SPEC_CUSTOMER_URL = "http://localhost:8080/api/customers/0000000000000"; 
var DELETE_CUSTOMER_URL = "http://localhost:8080/api/customers/57f5aeb9360f81f104543a7176587658765876593";
var DUMMY_CORRECT_CUSTOMER = {
    "_id": "57f5aeb9360f81f104543a7176587658765876590",
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
var DUMMY_CORRECT_CUSTOMER_TO_DELETE = {
    "_id": "57f5aeb9360f81f104543a7176587658765876593",
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
var DUMMY_CUSTOMER_WITH_FRIENDS = {
    "_id": "57f5aeb9360f81f104543a7176587658765876591",
    "first_name": "Stacy",
    "last_name": "Rivera",
    "address": {
        "street_number": "800",
        "street_name": "Blue Course Drive",
        "city": "State College",
        "state": "PA",
        "zip": "16802"
    }, 
    "friends": ["57f5aeb9360f81f104543a7176587658765876592"]
};
var DUMMY_CUSTOMER_WITH_FRIENDS_1 = {
    "_id": "57f5aeb9360f81f104543a7176587658765876592",
    "first_name": "Stacy",
    "last_name": "Rivera",
    "address": {
        "street_number": "800",
        "street_name": "Blue Course Drive",
        "city": "State College",
        "state": "PA",
        "zip": "16802"
    }, 
    "friends": ["57f5aeb9360f81f104543a7176587658765876591"]
}; 
var DUMMY_CORRECT_CUSTOMER_UPDATE = {
    "_id": "57f5aeb9360f81f104543a7176587658765876590",
    "first_name": "Stacy",
    "last_name": "Rivera",
    "address": {
        "street_number": "800",
        "street_name": "Blue Course Drive",
        "city": "State College",
        "state": "PA",
        "zip": "00000"
    }
};
var DUMMY_INCORRECT_CUSTOMER_UPDATE = {
    "_id": "57f5aeb9360f81f104543a7176587658765876590",
    "first_name": "Stacy",
    "last_name": "Rivera",
    "address": {
        "street_number": "800",
        "street_name": "Blue Course Drive",
        "city": "State College",
        "zip": "00000"
    }
};
var DUMMY_CORRECT_CUSTOMER_RESPONSE = {
    "_id": "57f5aeb9360f81f104543a7176587658765876590",
    "first_name": "Stacy",
    "last_name": "Rivera",
    "address": {
        "street_number": "800",
        "street_name": "Blue Course Drive",
        "city": "State College",
        "state": "PA",
        "zip": "16802"
    },
    "friends": []
};
var DUMMY_CORRECT_CUSTOMER_RESPONSE_WITH_FRIENDS = {
    "_id": "57f5aeb9360f81f104543a7176587658765876590",
    "first_name": "Stacy",
    "last_name": "Rivera",
    "address": {
        "street_number": "800",
        "street_name": "Blue Course Drive",
        "city": "State College",
        "state": "PA",
        "zip": "16802"
    },
    "friends": ["57f5aeb9360f81f104543a7176587658765876591"]
};
var DUMMY_INCORRECT_CUSTOMER_1 = {
    "_id": "57f5aeb9360f81f104543a7176587658765876590",
    "first_name": "Bob",
    "last_name": "Rivera",
    "address": {
        "street_number": "800",
        "street_name": "Blue Course Drive",
        "city": "State College",
        "state": "PA",
        "zip": "16802"
    }
};
var DUMMY_INCORRECT_CUSTOMER = {
    "_id": "57f5aeb9360f81f104543a717658765876587659",
    "first_name": "Stacy",
    "address": {
        "street_number": "800",
        "street_name": "Blue Course Drive",
        "city": "State College",
        "state": "PA"
    }
};
module.exports = {
    CUSTOMERS_URL: CUSTOMERS_URL,
    SPEC_CUSTOMER_URL: SPEC_CUSTOMER_URL,
    INCORRECT_SPEC_CUSTOMER_URL:INCORRECT_SPEC_CUSTOMER_URL,
    INCORRECT_SPEC_CUSTOMER_FRIENDS_URL: INCORRECT_SPEC_CUSTOMER_FRIENDS_URL,
    FRIEND1:FRIEND1, 
    FRIEND2:FRIEND2,
    CORRECT_CUSTOMER_SPEC_FRIEND_URL_1: CORRECT_CUSTOMER_SPEC_FRIEND_URL_1,
    CORRECT_CUSTOMER_SPEC_FRIEND_URL_2: CORRECT_CUSTOMER_SPEC_FRIEND_URL_2,
    DELETE_CUSTOMER_URL:DELETE_CUSTOMER_URL,
    DUMMY_CORRECT_CUSTOMER_RESPONSE_WITH_FRIENDS: DUMMY_CORRECT_CUSTOMER_RESPONSE_WITH_FRIENDS,
    INCORRECT_CUSTOMER_SPEC_FRIEND_URL:INCORRECT_CUSTOMER_SPEC_FRIEND_URL,
    INCORRECT_CUSTOMER_CORRECT_SPEC_FRIEND_URL: INCORRECT_CUSTOMER_CORRECT_SPEC_FRIEND_URL,
    SPEC_CUSTOMER_FRIENDS_URL:SPEC_CUSTOMER_FRIENDS_URL, 
    DUMMY_CORRECT_CUSTOMER_TO_DELETE:DUMMY_CORRECT_CUSTOMER_TO_DELETE,
    DUMMY_CUSTOMER_WITH_FRIENDS: DUMMY_CUSTOMER_WITH_FRIENDS,
    DUMMY_CUSTOMER_WITH_FRIENDS_1: DUMMY_CUSTOMER_WITH_FRIENDS_1,
    DUMMY_CORRECT_CUSTOMER_UPDATE: DUMMY_CORRECT_CUSTOMER_UPDATE,
    DUMMY_INCORRECT_CUSTOMER_UPDATE: DUMMY_INCORRECT_CUSTOMER_UPDATE, 
    DUMMY_CORRECT_CUSTOMER: DUMMY_CORRECT_CUSTOMER,
    DUMMY_CORRECT_CUSTOMER_RESPONSE: DUMMY_CORRECT_CUSTOMER_RESPONSE, 
    DUMMY_INCORRECT_CUSTOMER: DUMMY_INCORRECT_CUSTOMER,
    DUMMY_INCORRECT_CUSTOMER_1: DUMMY_INCORRECT_CUSTOMER_1    
};