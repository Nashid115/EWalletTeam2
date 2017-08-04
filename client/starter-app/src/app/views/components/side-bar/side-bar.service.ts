import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SideBarService {
  // private serverURL = 'login.json';
    

  constructor(private http : Http) { }

  getprogress_response(){
    return this.http.get('login.json')
    .map((resp : Response) => resp.json());
  }

}
