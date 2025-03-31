# Movie Manager Web Application

## Project Overview

This full-stack application allows users to search movies from an external API, save favorites, and manage their movie collection with a secure authentication system.

## Setup Instructions

### Prerequisites

- Node.js - i used v22
- .env file in the server and in the client
- Git

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/buchtzio/movie-manager.git
   cd movie-manager
   ```

2. **Backend Setup**

   ```bash
   cd server
   npm install
   npm run dev
   ```

   The server will run on http://localhost:5000

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```
   The application will open in your browser at http://localhost:5173

## Authentication

- Use these credentials to test the application:
  - Username: `admin`
  - Password: `1234`
- The JWT token is automatically stored in localStorage and added to subsequent requests

## Application Features

### Search Functionality

- Search for movies by title in the search bar
- Click the search button to execute the search
- The application fetches data from:
  `https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON`
- You can also filter what to get from the server by filter the search by year and genre (you can use both if wants)

### Movie Display

- Movies are displayed as cards containing:
  - Title
  - Poster image
  - Release year
  - Favorite button
- Results can be sorted by title or release year and you can also choose the sort order (desc or asc)

### Favorites Management

- Click the heart icon to add/remove movies from favorites
- Access the Favorites page via the navigation menu
- Favorites are stored in browser's localStorage for persistence

### Protected Routes

- All routes except login are protected
- Attempting to access protected routes without authentication redirects to login

## Evaluation Notes

- The application implements all required features in the specification
- No Database: As specified in the requirements, the application uses the external JSON file as the data source instead of a database
- Poster URL Fix: The poster URLs in the JSON data were using HTTP protocol, which had to be converted to HTTPS
- Implemented SOLID and DRY principle over the code as much as i could do
