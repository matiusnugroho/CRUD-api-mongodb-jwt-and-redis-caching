
# CRUD Express, MongoDB, JWT and Redis Caching

A very simple CRUD operation on MongoDB and caching with Redis

## Redis caching
For example we are caching user and set expiry for 10s, you will see {source : server/cache} in response respectively.
see user controller for detail


## API Reference

#### Get all user

```http
  GET /api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. x-access-token header|

#### Get User by Account Number 
```http
  GET api/user/accountNumber/:accountNumber
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. x-access-token header|
| `accounNumber` | `mumber` | any|

#### Get User by Account Number 
```http
  GET api/user/identityNumber/:identityNumber
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. x-access-token header|
| `identityNumber` | `mumber` | any|

#### Login and get token

```http
  POST /api/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | Username |
| `password`      | `string` | Password |


#### Input User for testing
```http
  POST /api/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userName`      | `string` | Required |
| `emailAddress`      | `string` | Required |
| `password`      | `string` | Required |
| `accountNumber`      | `string` | Required |
| `identityNumber`      | `string` | Required |
