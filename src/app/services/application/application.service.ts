import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(private http: HttpClient) {}
  // sample codes
  getEmployee() {
    this.http.get('hong/employees')
      .toPromise()
      .then(res => console.log(res));
  }

}
