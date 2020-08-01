import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private fb:FormBuilder, private http:HttpClient) { }
readonly URI = "http://localhost:49235/api/";
checkPasswords (fb:FormGroup){
  let checkPwdCtrl = fb.get('ConfirmPassword');
  let pwdCtrl = fb.get('Password');
  if (checkPwdCtrl.errors == null || 'passwordMismatch' in checkPwdCtrl.errors){
    if (pwdCtrl.value != checkPwdCtrl.value)
      checkPwdCtrl.setErrors({passwordMismatch:true});
    else
      checkPwdCtrl.setErrors(null);
  }

}
  formModel = this.fb.group({
    FirstName:['', Validators.required],
    LastName:['', Validators.required],
    Email:['',[Validators.required, Validators.email]],
    PhoneNumber:['',Validators.required],
     Pwords:this.fb.group
      ({     
        Password:['',Validators.required],
        ConfirmPassword:['',Validators.required]},
        {validators:this.checkPasswords})
  }); 

  clientRegistration(){
    var body = {
      FirstName: this.formModel.value.FirstName,
      LastName: this.formModel.value.LastName,
      Email: this.formModel.value.Email,
      PhoneNumber: this.formModel.value.PhoneNumber,
      Password: this.formModel.value.Pwords.Password
    };
    return this.http.post(this.URI+'user/ClientRegistration', body)
  }

   login (formData)
   {
    return this.http.post(this.URI+'user/login', formData)
   }

   getUserProfile()
   {
     return this.http.get(this.URI+'profile');   
   }
}
