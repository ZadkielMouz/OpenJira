# Next. js OpenJira App

In order to run this locally, it's needed a database.

```
docker-compose up -d
```
> The __d__ means __detached__

### MongoDB Local URL:

```
mongodb://localhost:27017/entriesdb
```

## Install Node modules and start development server

* First

```
yarn
or
yarn install
```
* Then
```
yarn dev
```

## ENV Variables

Rename the `.env.template` file to `env` and fill the variables.

## Seed Database with testing data

Just call this endpoint in order to seed data:

```
http://localhost:3000/api/seed
```