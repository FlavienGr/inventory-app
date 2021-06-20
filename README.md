# Inventory-cook-app

Inventory-cook-app is an application to help the chef handling his/her inventory of ingredients.

# Requirements

- Add and remove ingredients to his inventory
- Deal with quantities
- Change the name of his ingredients in case he misspelled them
- Handle uncountable ingredients as well (milk, olive oil, etc.)

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

## Start the express Api

```sh
cd api/
npm install
npm run start:dev
```
