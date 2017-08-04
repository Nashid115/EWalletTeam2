import { Injectable } from '@angular/core';
import {  Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class RegisterService {

  constructor(private _http : Http) { }

  private apiURL = 'http://10.0.1.30:8080/api/customer/add';

   postRegister(registerPostData){
       return this._http.post(this.apiURL, registerPostData)
        .map((response:Response) => response.json());
   }

}