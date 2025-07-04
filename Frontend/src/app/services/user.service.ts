import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/users'; // Using proxy

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  // Add these methods to your existing service
deleteUser(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}



/*updateUser(user: User): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${user.id}`, user);
}*/

// In user.service.ts
createUser(user: User): Observable<User> {
  return this.http.post<User>(this.apiUrl, user).pipe(
    catchError(error => {
      console.error('Create User Error:', error);
      return throwError(() => error); // Pass through the original error
    })
  );
}

updateUser(user: User): Observable<User> {  // Changed to return User instead of void
  return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
    catchError(error => {
      console.error('Update User Error:', error);
      return throwError(() => error);
    })
  );
}




}