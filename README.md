# Inventory-cook-app

Handling your inventory of ingredients.

# Installation guide

## What you need

| Runtime / Software | Version / tag                       |
| ------------------ | ----------------------------------- |
| Node js LTS        | [`14.17.1`](https://nodejs.org/en/) |
| Docker             |                                     |
| Docker Compose     |                                     |

## Start the database (Mongodb) with Docker

```sh
docker-compose up
```

## Configuration

- Look at the exemple file called .env.example inside the config folder and add your own params

```sh
cd api/
cp ./config/.env.example ./config/.env.development
cp ./config/.env.example ./config/.env.test

```

## Seed the database with fake data

```sh
cd api/
npm run seed:dev
```

## Start the express Api

```sh
cd api/
npm install
npm run dev
```

## Install the client

```sh
cd client/
npm install
```

## Start the client

```sh
npm start
```
