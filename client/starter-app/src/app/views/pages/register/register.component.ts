import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { PasswordValidation } from './password-validation';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
registerPostData={};

valid = true;
show = true;

  public registerForm = this.fb.group({
    name: ["", [Validators.required, Validators.pattern("")]],
    email: ["", Validators.required],
    phone: ["", [Validators.required, Validators.pattern("\\d{10}")]],
    password: ["", [Validators.required, Validators.pattern("(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}")]],
    confirmPassword: ["", [Validators.required]]

  },{
      validator: PasswordValidation.MatchPassword // your validation method
    }
  );

  constructor(private _registerService: RegisterService,
    public router : Router,
    public fb: FormBuilder,
    private registerService: RegisterService
  ) { }

    
 
postFunction(registerPostData)
{

  this._registerService.postRegister(registerPostData)
    .subscribe(
      data => {
         this.router.navigate(['./login']);
      },
      err => {
        if(err.status === 400) {
          this.valid = false;
        } else {
          this.show = false;
        }
      }
  );
}

  ngOnInit() {
    
  }


}

