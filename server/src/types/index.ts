export interface Movie {
    id: string;
    Title: string;
    Year: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Poster: string;
  }
  
  export interface User {
    username: string;
    password: string;
  }
  
  export interface JwtPayload {
    username: string;
    iat: number;
    exp: number;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }