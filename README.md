# NestJs API User Authentication

## Description

This repository is a challenge made for The Lucky APP

## Getting started

This is REST api made by node.js, nest, redis, mysql with typescript.

So you have to get node.js environment, redis for cache, mysql for database, know typescript syntax.

### Prerequisites

---

Please install node.js and I recommend to use docker for your database.

- Install Docker Destop for Linux: [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

- Install Docker Desktop for MAC: [https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)

- Install Docker Desktop for Windows: [https://docs.docker.com/docker-for-windows/install/](https://docs.docker.com/docker-for-windows/install/)

- Install compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

## Installation

Clone the repository in your projects folder and run the project with docker-compose

```bash
$ git clone git@github.com:lmartinezsch/nestjs-users.git
```

## Running the app

```bash
$ cd nestjs-users
$ docker-compose up -d --build
```

## Inserting relevant information into the database

Excecute this commands for insert a country and a city

```bash
docker exec -i myapp_mysql mysql -umyapp -pmyapp users_api   <<< 'insert into countries set name = "Argentina", iso3 = "ARG", iso2 = "AR";'
docker exec -i myapp_mysql mysql -umyapp -pmyapp users_api   <<< 'insert into cities set name = "Buenos Aires", countryId = (select id from countries where iso3 = "ARG");'
```

## Running the app

```bash
$ cd nestjs-users
$ docker-compose up -d --build
```

# REST API

The REST API to the app is described below.

## Create a new User

### Request

`POST /auth/register`

    curl --location --request POST 'http://localhost:5000/api/v1/auth/register' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "leandro.martinez01@gmail.com",
        "password": "TheLuckyApp2021!",
        "name": "Leandro",
        "address": "Calle falsa 123",
        "cityId": 1
    }'

### Response

    HTTP/1.1 201 Created

## Login User

### Request

`POST /auth/login`

    curl --location --request POST 'http://localhost:5000/api/v1/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "leandro.martinez01@gmail.com",
        "password": "TheLuckyApp2021!"
    }'

### Response

    HTTP/1.1 200 OK
    {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlYW5kcm8ubWFydGluZXowM0BnbWFpbC5jb20iLCJzdWIiOjIsImlhdCI6MTYzNzk3MDkyMCwiZXhwIjoxNjM4MDU3MzIwfQ.KQ0exM4P1hSt3wNGd9fdENbYz-frZGUNY24sjXiBd4A"
    }

## Get user profile

### Request

`GET /users/profile`

    curl --location --request GET 'http://localhost:5000/api/v1/users/profile' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlYW5kcm8ubWFydGluZXowMUBnbWFpbC5jb20iLCJzdWIiOjEsImlhdCI6MTYzNzk2MjIzNiwiZXhwIjoxNjM4MDQ4NjM2fQ.PV1W1BHSr-fHzYOVJUaPJXlYJ3cZX2slzI2kPyL63uE'

### Response

    HTTP/1.1 200 OK
    {
    "id": 1,
    "name": "Leandro",
    "address": {
        "street": "Calle falsa 123",
        "city": "Buenos Aires",
        "country": "Argentina"
    }

}


# Redis

To check the data in redis you can use this command:  
`docker exec -it myapp_redis redis-cli`
