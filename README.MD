# BookmyShow API

Bookmyshow-api is a Node.js application that provides APIs for managing cities, theatres, movies, and shows.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone git@github.com:JRajz/bookmyshow-api.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd bookmyshow-api
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

## Upcoming Feature

    - User Authentication
    - Seat Mapping
    - Ticket booking

## Endpoints

### Get Cities

- **Method**: GET
- **URL**: `http://localhost:3000/cities`
- **Description**: Retrieve all cities

### Get Theatres in a City

- **Method**: GET
- **URL**: `http://localhost:3000/cities/:cityId/theatres`
- **Path Variable**:
  - cityId: Identifier for the city.
- **Description**: Retrieve all theatres in a city.

#### Get Movies in a City

- **Method**: POST
- **URL**: `http://localhost:3000/cities/:cityId/movies`
- **Path Variable**:
  - cityId: Identifier for the city.
- **Description**: Retrieve all movies running in the city

#### GET All Shows in specific Theatre:

- **Method**: GET
- **URL**: `http://localhost:3000/theatres/:theatreId/shows`
- **Path Variable**:
  - theatreId: Identifier for the theatre.
- **Query Parameter**:
  - date: Date for which shows are requested.
- **Description**: Get all the shows in the theatre.

## Database

The application uses a MySQL database to store information about cities, theatres, movies, screens, and shows. The database schema can be found [here](https://github.com/JRajz/bookmyshow-sql).
