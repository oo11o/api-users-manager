## Start
```
docker-compose up --build
URL: http://127.0.0.1:3010/

+ fake data of users
```

### endpoint
```
/users  - manage users
/login  - get tocken

POST, PATCH, DELETE - need auth
```

### change token [POST /login]
```
{"login":"admin", "password": "example"}

```

### OR use ready token for [POST PATCH DELETE /users]
```
REQUEST HEADER: 
x-authorization : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjY0OTc3NTUyfQ.u3o2vY9AdZ3HEqiEo8swBMsclUHBASnL0CVcOQTAd2c
```

### METHODS
```
Method	 URL	 Operation
----------------------------------
GET	/users List of users
GET	/users/1 Information about a specific user
POST	/users/ Create a new user  
PATCH	/users/1 Update a specific user 
DELETE	/users/1 Delete a specific user 

for POST and PATCH
{"firstname":"Joe", "secondname": "John"}

```