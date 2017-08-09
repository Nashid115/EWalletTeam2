import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';

@Injectable()
export class NotificationService {

  constructor(private http: Http) { }

  private apiURL = 'http://10.0.1.62:8080/api/customer/notification/';

  getNotification(id) {
  	return this.http.get(this.apiURL+id)
  	.toPromise()
  	.then(res => res.json());
  }
}
