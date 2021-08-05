#Server

Create a config folder, inside it create default.json

The default.json file should contain 3 properties

{
"databaseURL": "Link to mongodb database",
"JwtKey": "Secret key for JWT authentication",
"defaultTokenExpiry": "JWT token expiration in seconds"
}

start server: $ yarn start
start dev server: $ yarn dev
