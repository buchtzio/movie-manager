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
    token: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  export type SortOrder = 'asc' | 'desc';
  
  export interface MovieFilterParams {
    title?: string;
    genre?: string;
    year?: string;
    sortBy?: string;
    sortOrder?: SortOrder;
  }