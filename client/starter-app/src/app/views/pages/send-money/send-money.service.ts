import { Injectable } from '@angular/core';
import {  Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SendMoneyService {

  constructor(private _http : Http) { }

  private apiURL = 'http://10.0.1.30:8080/api/customer/send';

   postRegister(sendMoneyPostData){
       return this._http.post(this.apiURL, sendMoneyPostData)
        .toPromise()
        .then(res => res.json());

        
    }

}
