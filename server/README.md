# git-group-project-
# events-app-backend-


API information: This app uses a 3rd party api to get the events information, source : https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/. this api offers almost every updated event for events in music,sports etc.

App security: This app has an Authentication system which allows us to give access to the app to whoever creates a password and account or signs in . 

### Event Schema

| Field       | Type   | Description                                                                       |
| ----------- | ------ | --------------------------------------------------------------------------------- |
| eventName:  | String |  Gives the event name .                                                           |
| eventDate:  | String |  Gives the date of the event .                                                    |
| eventTime:  | String |  Gives the time that event will be.                                               |
| eventVenue: | String |  Gives informaton on where the event will take place in the city.                 |
|eventMinPrice:| Number|  Shows the minimum price of a ticket.                                             |
|eventMaxPrice:| Number|  Shows the maximum price of a ticket.                                             |
| eventCity:   | String|  shows the city on the ticket of the event .                                      |
| eventTickets:| String|  Allows for the ticket to be pulled from the api .                                |
| eventPicture:| String|  Allows for the picture of the event to be rendered on the ticket.                |
| eventCategory:|String|  Shows the genre                                                                  |



### Favorite Schema

| Field       | Type   | Description                      |
| ----------- | ------ | -------------------------------- |
| UserId |Schema.types.objectId|  ref:users               |
| eventId|Schema.types.objectId|  ref: events             |
                                                                 

## CRUD Functionality


### Authentication End points 
#### POST
- **_/auth/register**- will send you to the sign up page where you will create your profile.

#### POST
- **_/auth/login**- will send you to the login page where you will login into your account.

#### GET 
- **_/auth/verify**= will send you to a verification page to verify who you are for your accounts security after you havw logged in. 

### Events Endpoints

#### GET
- **_/events** - Shows all of the events .

#### GET
- **_/events/:Id** - allows you to search for specific event that has a specific ID.


### Favorites End point 

#### GET
- **_/favorite** - allows to get all of your favorite events .

#### Post
- **_/favorite/add/:eventId** - you can like a event and it to your favorites.
 
#### DELETE 
- **_/favorite/remove/:favoriteID** - you can delete a liked event from your favorites .
                                                                