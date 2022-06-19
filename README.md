# rss2022 CRUD API

### The simple CRUD API using in-memory database

Application for saving, modifying, deleting an array of user objects

## How to install

1. Download or clone this repository

   > git clone git@github.com:MatusVit/rss2022-crud-api.git

   or

   > git clone https://github.com/MatusVit/rss2022-crud-api.git

   select branch 'task03'

   > git checkout task3

2. Install dependencies
   > npm install

## How to use

Run application

- development mode

  > npm run start:dev

- development mode

  > npm run start:prod

- starts multiple instances
  > npm run start:multi

Use Postman or something like send below requests:

- get all user objects

  > GET api/users

- get user object by id

  > GET api/users/${userId}

- create new user object

  > POST api/users

- update existing user object

  > PUT api/users/{userId}

- delete existing user object
  > DELETE api/users/${userId}

The object must have the following fields:

```
{
   id: 15b7bc5b-b159-4a9d-bf64-d9b63ae054f6
   username: Vital
   age: 33
   hobbies: ['drinking', 'gaming', 'programming']
}
```

**id** — unique identifier (string, uuid) generated on server side

**username** — user's name (string, required)

**age** — user's age (number, required)

**hobbies** — user's hobbies (array of strings or empty array, required)
