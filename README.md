# grocery-list

This is the backend for a grocery list application.

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

### Testing
Tests can be ran from ```/backend```:
```
npm test
```

## Deployment

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
#### Example usage
```javascript
// Promises
axios.get('/api/groceries')
  .then(({ data }) => console.log(data))

// Async/Await
const { data } = await axios.get('/api/groceries')
console.log(data)
```