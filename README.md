
# CRUD Express, MongoDB, JWT and Redis Caching

A brief description of what this project does and who it's for


## API Reference

#### Get all user

```http
  GET /api/user
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