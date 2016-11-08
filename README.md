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
