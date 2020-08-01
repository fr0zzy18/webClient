import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ClientRegistrationComponent } from './user/client-registration/client-registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AgentRegistrationComponent } from './user/agent-registration/agent-registration.component';






const routes: Routes = [
  {path:'',redirectTo:'/user/login', pathMatch:'full'},
  {path:'user', component:UserComponent,
  children:[
    {path:'client-registration', component: ClientRegistrationComponent},
    {path:'agent-registration', component:AgentRegistrationComponent},
    {path:'login', component: LoginComponent}
  ]},
  {path: "home", component:HomeComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
