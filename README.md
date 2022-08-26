# Trip Logger

## Goals

- Log holiday destinations visited. (MVP)
- log destinations left to visit

         Server       Client

DEV:     Nodemon      vite-dev-server
prod     node         *static file served*

## Data Shapes

### Entities

- Places (countries)
- Users (Auth0 - sub(id)) - store extra info
- Trips [user, place, date]

### Views

- Profile (trips)
- Unvisited places
- Leaderboard (who has visited most places)
