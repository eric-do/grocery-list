# Grocery List

This is the backend for a simple grocery list application.

The current deployment is on domain:
```
https://hrsf-grocery-list.herokuapp.com/
```
i.e. groceries API is available at
```
https://hrsf-grocery-list.herokuapp.com/api/groceries
```
## Tech stack
- Server: Node/Express
- Database: Postgres
- Testing: Mocha/Chai with Supertest
- Deployment: Heroku

## Local development
### Database
First, make sure to create a Postgres database called ```groceries```.

From the ```/backend/db/migrations``` directory:
```
psql groceries < 00_init.sql
```

In the `backend` directory, create a `.env` file with a DATABASE_URL variable
```
DATABASE_URL=postgres://postgres@localhost:5432/groceries
```
### Testing
Tests can be ran from ```/backend```:
```
npm test
```

## Deployment
This section is for anyone who wants to create their own deployment of the application. It assumes the developer already has Heroku CLI configured.
### Connect app to Heroku
1. Fork this application to your Github account
2. Create a new app on Heroku, e.g. `hrsf-grocery-list`
3. In Heroku `Deployment` settings, select `Github` as Deployment Method
4. Connect the forked application

### Configure build packs
1. Go to Settings
2. Add buildpack `heroku/nodejs`
3. Add buildpack `https://github.com/timanovsky/subdir-heroku-buildpack`
4. **Important:** the subdirectory buildpack *must* be used for a subdirectory build, and *must* be ordered on top of `heroku/nodejs` buildpack
5. In Settings > Config Vars, add `PROJECT_PATH` key with value `backend`

### Deploy Heroku Postgres
1. Go to Resources
2. Search add-ons for `Heroku Postgres`
3. Add Heroku Postgres to your application
4. From your CLI, push data from local DB to Heroku Postgres with
```
heroku pg:push <LOCAL DB NAME> <PSQL ADD-ON NAME> --app <APP NAME>

# Example
heroku pg:push groceries postgresql-convex-03452 --app hrsf-grocery-list
```
The `DATABASE_URL` environment variable is automatically added with the Heroku Postgres add-on.

This app code already references the environment variable.

### Enable automatic deployment
At this point automatic deployment can be enabled so deploys happen automatically when code is merged to `master`. You may need to do a manual deployment first.

You can see the URL at Settings > Domains. It should be something like:
```
https://<APP NAME>.herokuapp.com/
```

Requests can be made to
```
https://<APP NAME>.herokuapp.com/api/groceries
```
## Useful Heroku CLI commands
Connect to Heroku Postgres
```
heroku pg:psql -a <APP NAME>
```
View logs
```
heroku logs -t
```
## Routes
### ```POST /api/groceries```
Inserts a grocery item.
#### Parameters
| Param | Type | Description |
| ------------- | ------------- | ------------- |
| item | string | Name of grocery item |
| quantity | integer | Quantity of grocery item |

#### Response
| Param | Type | Description |
| ------------- | ------------- | ------------- |
| id | integer | ID of grocery item |

#### Status codes
| Status | Description |
| ------------- | ------------- |
| 201 | Item successfully inserted |
| 400 | Bad request |

#### Example usage
```javascript
// Promises
axios.post('/api/groceries', { item: 'apple', quantity: 1 })
  .then(({ data }) => console.log(data.id))

// Async/Await
const { data } = await axios.post('/api/groceries', {
  item: 'apple',
  quantity: 1
});
console.log(data.id)
```
### ```GET /api/groceries```
Gets all groceries.
#### Status codes
| Status | Description |
| ------------- | ------------- |
| 200 | Query was successful |
| 500 | Internal server error |
#### Example usage
```javascript
// Promises
axios.get('/api/groceries')
  .then(({ data }) => console.log(data))

// Async/Await
const { data } = await axios.get('/api/groceries')
console.log(data)
```

Example response
```
[
  {
    id: 1,
    item: 'apple',
    quantity: 5
  },
  {
    id: 2,
    item: 'banana',
    quantity: 6
  }
]
```

### ```DELETE /api/groceries/:id```
Deletes a grocery item by ID.


#### Status codes
| Status | Description |
| ------------- | ------------- |
| 200 | Query was successful |
| 500 | Internal server error |
#### Example usage
```javascript
axios.delete('/api/groceries/1')
```
### ```POST /api/groceries/seed```
Resets DB to its original state with 2 grocery items.
No query parameters needed.
#### Status codes
| Status | Description |
| ------------- | ------------- |
| 200 | Query was successful |
| 500 | Internal server error |