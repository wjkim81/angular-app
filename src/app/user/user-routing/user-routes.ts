import { Routes } from '@angular/router';

import { UserComponent } from '../user.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { PatientdetailComponent } from '../patientdetail/patientdetail.component';
import { OrderComponent } from '../patientdetail/order/order.component';
import { RegisterPatientComponent } from '../register-patient/register-patient.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserLoginComponent } from '../user-login/user-login.component';

import { AuthGuardService as AuthGuard } from '../../shared/services/auth-guard.service';

export const userRoutes: Routes = [{
  path: '',
  component: UserComponent,
  canActivateChild: [AuthGuard],
  children: [
    {
      path: 'home',
      component: UserHomeComponent,
    },
    {
      path: 'patients/:id',
      component: PatientdetailComponent
    },
    {
      path: 'patients/:id/order',
      component: OrderComponent
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