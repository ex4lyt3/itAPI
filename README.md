# itAPI Documentation
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![NodeJS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
## POST Submit Quiz
`/quiz/submit`
### Request Headers
- **authorization**: JWT token retrieved from `/user/authenticate`

### Request Body
- place
- highlights
- username
- additionalOptions 

## POST Create User
`/user/create`

### Request Body
- username
- password

## POST User Log in/Authenticate
`/user/authenticate`

### Request Body
- username
- password

## POST Comment Itinerary
`itinerary/comment`
### Request Body
- itineraryid
- comment
- rating
- username

## POST View Itinerary
`itinerary/view`

### Request Headers
- **authorization**: JWT token retrieved from `/user/authenticate`

## POST Recommend Itinerary
`itinerary/recommend`
### Request Headers
- **authorization**: JWT token retrieved from `/user/authenticate`

### Request Body
- popularity
- budget

## GET List Places
`places/list`
### Request Headers
- **authorization**: JWT token retrieved from `/user/authenticate`