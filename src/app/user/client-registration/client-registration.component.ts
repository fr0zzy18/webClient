import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styles: [
  ]
})
export class ClientRegistrationComponent implements OnInit {

  constructor(public service: UserService) { }

  ngOnInit(): void {
    this.service.formModel.reset(); 
  }
  onSubmit(){
    this.service.clientRegistration().subscribe(
      (res:any) => {
        if (res.succeeded){
         this.service.formModel.reset(); 
        }else{
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                //username already taken.
                break;            
              default:
              //registration failed.
                break;
            }
          });
        }
      }, 
      err => {console.log});
  }
}
