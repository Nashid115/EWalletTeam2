import { Component } from '@angular/core';

import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'E-Wallet Dashboard';
  httpResponse:any;

  constructor(private http:Http){

  }

  ngOnInit(){
    // this.http.get('http://localhost:8080/api/employees')
    // .subscribe((res:Response)=>{
    //   this.httpResponse=res.json().text;
    // })
  }

}
