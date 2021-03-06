import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
  }

  /**
   * Creates a HTTP GET request to the provided URI.
   *
   * @param uri The destination URI
   * @returns HTTP Request (Observable)
   */
  public getRequest(uri: string) {
    return new Observable(subscribe => {
      this.http.get(encodeURI(environment.apiUrl + uri), {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.userService.getAccessToken()}`
        })
      }).subscribe({
        next: data => subscribe.next(data),
        error: error => subscribe.error(error),
        complete: () => subscribe.complete()
      });
    });
  }

  /**
   * Creates a HTTP GET request to the provided URI.
   *
   * @param uri The destination URI
   * @returns HTTP Request (Observable)
   */
  public getBlobRequest(uri: string) {
    return new Observable(subscribe => {
      this.http.get(encodeURI(environment.apiUrl + uri), {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.userService.getAccessToken()}`
        }),
        responseType: 'blob'
      }).subscribe({
        next: data => subscribe.next(data),
        error: error => subscribe.error(error),
        complete: () => subscribe.complete()
      });
    });
  }

  /**
   * Creates a HTTP POST request to the provided URI containing JSON data.
   *
   * @param uri The destination URI
   * @param payload The payload to be JSON encoded
   * @returns HTTP Request (Observable)
   */
  public postJSONRequest(uri: string, payload: any) {
    return new Observable(subscribe => {
      this.http.post(encodeURI(environment.apiUrl + uri), JSON.stringify(payload), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.userService.getAccessToken()}`
        })
      }).subscribe({
        next: data => subscribe.next(data),
        error: error => subscribe.error(error),
        complete: () => subscribe.complete()
      });
    });
  }

  /**
   * Creates a HTTP DELETE request to the provided URI.
   *
   * @param uri The destination URI
   * @returns HTTP Request (Observable)
   */
  public deleteRequest(uri: string) {
    return new Observable(subscribe => {
      this.http.delete(encodeURI(environment.apiUrl + uri), {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.userService.getAccessToken()}`
        })
      }).subscribe({
        next: data => subscribe.next(data),
        error: error => subscribe.error(error),
        complete: () => subscribe.complete()
      });
    });
  }

}
