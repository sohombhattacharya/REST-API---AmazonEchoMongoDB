# REST-API---AmazonEchoMongoDB

## GET /api/customers
### Response
list of customers

## GET /api/customers/{id}
### Request
need to specify customer id
### Response
{
  "_id": "580e9bbfd15f730003173038",
  "first_name": "Billy",
  "last_name": "Porter",
  "address": {
    "street_number": "800",
    "street_name": "Blue Course Drive",
    "city": "State College",
    "state": "PA",
    "zip": "16802"
  },
  "friends": []
}

## POST /api/customers
### Request
{
  "first_name": "Billy",
  "last_name": "Porter",
  "address": {
    "street_number": "800",
    "street_name": "Blue Course Drive",
    "city": "State College",
    "state": "PA",
    "zip": "16802"
  }
}
### Response
{
  "success": "added customer",
  "body": {
    "first_name": "Billy",
    "last_name": "Porter",
    "address": {
      "street_number": "800",
      "street_name": "Blue Course Drive",
      "city": "State College",
      "state": "PA",
      "zip": "16802"
    },
    "_id": "58215be142ebe500030726a8",
    "friends": []
  }
}

## PUT /api/customers/{id}
### Request
{
  "first_name": "Billy",
  "last_name": "Porter",
  "address": {
    "street_number": "900",
    "street_name": "Blue Course Drive",
    "city": "State College",
    "state": "PA",
    "zip": "16802"
  }
}
### Response
{
  "success": "updated customer",
  "body": {
    "_id": "58215be142ebe500030726a8",
    "first_name": "Billy",
    "last_name": "Porter",
    "address": {
      "street_number": "900",
      "street_name": "Blue Course Drive",
      "city": "State College",
      "state": "PA",
      "zip": "16802"
    },
    "friends": []
  }
}

## DELETE /api/customers/{id}
### Request
need to specify customer id
### Response 
{
  "success": "found and deleted customer"
}

## GET /api/customers/{id}/friends
### Request
need to specify customer id
### Response
list of friends

## POST /api/customers/{id}/friends/{friendID}
### Request
need to specify customer id, and friend id to add as friend
### Response
{
  "success": "added friend",
  "body": {
    "_id": "580e9bd3d15f730003173039",
    "first_name": "Stacy",
    "last_name": "Rivera",
    "address": {
      "street_number": "800",
      "street_name": "Blue Course Drive",
      "city": "State College",
      "state": "PA",
      "zip": "16802"
    },
    "friends": [
      "580e9bbfd15f730003173038"
    ]
  }
}

## DELETE /api/customers/{id}/friends/{friendID}
### Request
need to specify customer id, and friend id to delete
### Response 
{
  "success": "removed friend",
  "body": {
    "_id": "580e9bd3d15f730003173039",
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
  }
}

## GET /api/customers/{id}/account
### Request
need to specify customer id
### Response
{
  "_id": "5821240e17d9f90003c29f82",
  "customer_id": "580e9bbfd15f730003173038",
  "type": "Credit Card",
  "nickname": "random",
  "rewards": 0,
  "balance": 90.30999999999999,
  "account_number": "11111"
}

## GET /api/accounts
### Response
list of accounts

## POST /api/customers/{id}/account
### Request
{
  "type": "Credit Card",
  "nickname": "random",
  "rewards": 0,
  "balance": 55.45,
  "account_number": "11111"
}

### Response
{
  "success": "added account",
  "body": {
    "customer_id": "580e9be2d15f73000317303a",
    "type": "Credit Card",
    "nickname": "random",
    "rewards": 0,
    "balance": 55.45,
    "account_number": "11111",
    "_id": "582162b642ebe500030726ac"
  }
}

## PUT /api/accounts/{id}
### Request
{
  "customer_id": "580e9be2d15f73000317303a",
  "type": "Credit Card",
  "nickname": "test",
  "rewards": 0,
  "balance": 55.45,
  "account_number": "11111"
}
### Response
{
  "success": "updated account",
  "body": {
    "_id": "582162b642ebe500030726ac",
    "customer_id": "580e9be2d15f73000317303a",
    "type": "Credit Card",
    "nickname": "test",
    "rewards": 0,
    "balance": 55.45,
    "account_number": "11111"
  }
}

## DELETE /api/accounts/{id}
### Request 
need to specify account id
### Response
{
  "success": "found and deleted account"
}


