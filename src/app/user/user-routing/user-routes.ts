import { Routes } from '@angular/router';

import { UserComponent } from '../user.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { RegisterPatientComponent } from '../register-patient/register-patient.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserLoginComponent } from '../user-login/user-login.component';

export const userRoutes: Routes = [{
  path: '',
  component: UserComponent,
  children: [
    {
      path: 'home',
      component: UserHomeComponent
    },
    {
      path: 'register-patient',
      component: RegisterPatientComponent
    },
    {
      path: 'user-info',
      component: UserInfoComponent
    },
    {
      path: 'user-login',
      component: UserLoginComponent
    },
    {
      path: '', redirectTo: '/home', pathMatch: 'full'
    }
  ]
}];