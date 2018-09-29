import { Routes } from '@angular/router';

import { UserComponent } from '../user.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { RegisterPatientComponent } from '../register-patient/register-patient.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { PatientdetailComponent } from '../patientdetail/patientdetail.component';

// import { CobbAngleComponent } from '../cobb-angle/cobb-angle.component';

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
      path: 'patients/:id',
      component: PatientdetailComponent
    },
    // {
    //   path: 'cobb-angle',
    //   component: CobbAngleComponent
    // },
    {
      path: '', redirectTo: '/home', pathMatch: 'full'
    }
  ]
}];