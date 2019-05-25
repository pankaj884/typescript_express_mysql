# API Documentation

This documentation will provide with latest APIs for Jatana Dashboard, which includes Public and Secured APIs. Secured APIs should include the `Authorization` header with a token which is being generated from `login` API.

Here is the list of all APIs including Public and Secured:

# Public APIs
## [POST] `/api/login`

- Request Payload:
```json
{
  "email": "example@example.com",
  "password": "test123"
}

```
- Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhMjI5MzkzOWZlY2MxMzFlZmJkYTM5OSIsImNyZWF0ZWRBdCI6IjIwMTctMTItMDJUMTE6NTA6NDMuNDA1WiIsInVwZGF0ZWRBdCI6IjIwMTctMTItMDJUMTE6NTA6NDMuNDA1WiIsInVzZXJuYW1lIjoibWVuZGltIiwiZW1haWwiOiJtZW5kaW1AamF0YW5hLmFpIiwiX192IjowLCJyb2xlIjoiU3VwZXJBZG1pbiJ9LCJpYXQiOjE1MTI3NDI1NTF9.45JdlcctvkUDJ6n1G-_rlKL0FPV8t9w5SpWmjo_RXoY"
}
```

## Create Client and User
This API is used only for new Client/User. And it will create a client and a User for that client.

[POST] `/api/public/clients`

- Request Payload:
```json
{
  "identifier": "mendim",
  "name": "Client 1",
  "displayName": "Client John Doe",
  "user": {
    "email": "example@example.com",
    "password": "123"
  }
}
```

- Response:
```json
{
  "createdAt": "2017-12-11T13:38:47.173Z",
  "updatedAt": "2017-12-11T13:38:47.173Z",
  "name": "Client 1",
  "displayName": "Client John Doe",
  "identifier": "mendim",
  "_id": "5a2e8a67870c7c65837adace",
  "plan": {
      "api": false,
      "dashboard": false
  },
  "clientLang": "danish"
}
```

## [GET] `/api/public/clients/by-identifier?identifier=mendim`

- Response:
```json
{
  "_id": "5a5f54e8d0ff6907d3b104f3",
  "createdAt": "2018-01-17T13:51:36.634Z",
  "updatedAt": "2018-01-17T13:51:36.634Z",
  "identifier": "mendim1",
  "__v": 0,
  "displayName": "Client John D2",
  "name": "Client 11",
  "state": "ZendeskConnect",
  "clientLang": "danish",
  "plan": {
      "api": false,
      "dashboard": false
  }
}
```

# Secured APIs
All secured APIs should include `Authorization` header like:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhMjI5MzkzOWZlY2MxMzFlZmJkYTM5OSIsImNyZWF0ZWRBdCI6IjIwMTctMTItMDJUMTE6NTA6NDMuNDA1WiIsInVwZGF0ZWRBdCI6IjIwMTctMTItMDJUMTE6NTA6NDMuNDA1WiIsInVzZXJuYW1lIjoibWVuZGltIiwiZW1haWwiOiJtZW5kaW1AamF0YW5hLmFpIiwiX192IjowLCJyb2xlIjoiU3VwZXJBZG1pbiJ9LCJpYXQiOjE1MTI3NDI1NTF9.45JdlcctvkUDJ6n1G-_rlKL0FPV8t9w5SpWmjo_RXoY"
}
```

The token should be taken from `login` resp

## [GET] `/api/clients`

- Response:

```json
[
  {
    "_id": "5a2e8a67870c7c65837adace",
    "createdAt": "2017-12-11T13:38:47.173Z",
    "updatedAt": "2017-12-11T13:38:47.173Z",
    "name": "Client 1",
    "displayName": "Client John Doe",
    "__v": 0,
    "plan": {
        "api": false,
        "dashboard": false
    },
    "clientLang": "danish"
  },
  {
    "_id": "5a2e8a67870c7c65837adacf",
    "createdAt": "2017-12-11T13:38:47.173Z",
    "updatedAt": "2017-12-11T13:38:47.173Z",
    "name": "Client 2",
    "displayName": "Client John Smith",
    "__v": 0,
    "plan": {
        "api": false,
        "dashboard": false
    },
    "clientLang": "danish"
  }
]
```

## [POST] `/api/clients`

- Request Payload:
```json
{
  "name": "Client 1",
  "displayName": "Client John Doe"
}
```
- Response:
```json
{
  "createdAt": "2017-12-11T13:38:47.173Z",
  "updatedAt": "2017-12-11T13:38:47.173Z",
  "name": "Client 1",
  "displayName": "Client John Doe",
  "_id": "5a2e8a67870c7c65837adace",
  "plan": {
      "api": false,
      "dashboard": false
  },
  "clientLang": "danish",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNsaWVudElkIjoiNWEyZThhNjc4NzBjN2M2NTgzN2FkYWNlIn0sImNsaWVudE5hbWUiOiJNZW5kaW0gTWVzdGFuaSIsImlhdCI6MTUxMjk5OTUyN30.KFyb6w0IGqa8Hv1Fg-rOJbN5o1ijTZ5NyaRv3Zl89Qo"
}
```

## [PUT] `/api/clients/{clientId}`

- Params:
```json
{
  "clientId": "5a2e8a67870c7c65837adace"
}
```

- Request Payload:
```json
{
  "name": "Client 1",
  "displayName": "Client John Doe"
}
```
- Response:
```json
{
  "createdAt": "2017-12-11T13:38:47.173Z",
  "updatedAt": "2017-12-11T13:38:47.173Z",
  "name": "Client 1",
  "displayName": "Client John Doe",
  "_id": "5a2e8a67870c7c65837adace",
  "plan": {
      "api": false,
      "dashboard": false
  },
  "clientLang": "danish",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNsaWVudElkIjoiNWEyZThhNjc4NzBjN2M2NTgzN2FkYWNlIn0sImNsaWVudE5hbWUiOiJNZW5kaW0gTWVzdGFuaSIsImlhdCI6MTUxMjk5OTUyN30.KFyb6w0IGqa8Hv1Fg-rOJbN5o1ijTZ5NyaRv3Zl89Qo"
}
```

## [GET] `/api/clients/{clientId}`

- Params:
```json
{
  "clientId": "5a2e8a67870c7c65837adace"
}
```

- Response:
```json
{
  "createdAt": "2017-12-11T13:38:47.173Z",
  "updatedAt": "2017-12-11T13:38:47.173Z",
  "name": "Client 1",
  "displayName": "Client John Doe",
  "_id": "5a2e8a67870c7c65837adace",
  "plan": {
      "api": false,
      "dashboard": false
  },
  "clientLang": "danish",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNsaWVudElkIjoiNWEyZThhNjc4NzBjN2M2NTgzN2FkYWNlIn0sImNsaWVudE5hbWUiOiJNZW5kaW0gTWVzdGFuaSIsImlhdCI6MTUxMjk5OTUyN30.KFyb6w0IGqa8Hv1Fg-rOJbN5o1ijTZ5NyaRv3Zl89Qo"
}
```

## [DELETE] `/api/clients/{clientId}`

- Params:
```json
{
  "clientId": "5a2e8a67870c7c65837adace"
}
```
