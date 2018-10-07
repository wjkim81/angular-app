import { NgModule } from '@angular/core';

/**
 * Import core and shared module
 * While I am reading the Internet, I misunderstand core and shared modules.
 * It seems they provide similar functions, so it was not neccesary to seperate them.
 * Anyway, I arranged these two modules as following:
 * 
 * core module defines modules and services commonly used in all modules.
 * shared module defines directives, pipes, and components commonly used in all modules.s
 */
import { CoreModule } from '../core-module/core-module.module';
import { SharedModule } from '../shared/shared-module.module';

/**
 * Import user routing module.
 */
import { UserRoutingModule } from './user-routing/user-routing.module';

/**
 * UserNavbarComponent and FooterComponent are header and footer in all user pages.
 */
import { UserComponent } from './user.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { FooterComponent } from './footer/footer.component';

/**
 * UserHomeComponent shows list of patients.
 */
import { UserHomeComponent } from './user-home/user-home.component';

/**
 * PatientdetailComponent
 * |
 * + AddBodymeasurementModalComponent
 */
import { PatientdetailComponent } from './patientdetail/patientdetail.component';
import { AddBodymeasurementModalComponent } from './patientdetail/add-bodymeasurement-modal/add-bodymeasurement-modal.component';
import { AddSpineprescriptionModalComponent } from './patientdetail/add-spineprescription-modal/add-spineprescription-modal.component';
import { AddDiagnosisModalComponent } from './patientdetail/add-diagnosis-modal/add-diagnosis-modal.component';
import { OrderComponent } from './patientdetail/order/order.component';

/**
 * RegisterPatientComponent
 * |
 * +- 1. PatientInfoComponent
 * +- 2. SpinePrescriptionComponent
 * +- 3. CommentComponent
 * +- 4. BodyMeasurementComponent
 * +- 5. CompleteRegisterComponent
 * 
 * CooAnbleCompoent can be inserted between PatientInfo and SpinePrescription in the future.
 * 
 */
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { PatientInfoComponent } from './register-patient/patient-info/patient-info.component';
import { SpinePrescriptionComponent } from './register-patient/spine-prescription/spine-prescription.component';
import { CommentComponent } from './register-patient/comment/comment.component';
import { BodyMeasurementComponent } from './register-patient/body-measurement/body-measurement.component';
import { CompleteRegisterComponent } from './register-patient/complete-register/complete-register.component';
import { CobbAngleComponent } from './cobb-angle/cobb-angle.component';

import { UserInfoComponent } from './user-info/user-info.component';

/**
 * Import services here used only for UserModule
 */

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    // Routing should be the last
    UserRoutingModule,
  ],
  declarations: [
    UserComponent,
    UserNavbarComponent,
    FooterComponent,
    UserHomeComponent,
    PatientdetailComponent,
    AddBodymeasurementModalComponent,
    AddSpineprescriptionModalComponent,
    AddDiagnosisModalComponent,
    OrderComponent,
    RegisterPatientComponent,
    PatientInfoComponent,
    CobbAngleComponent,
    SpinePrescriptionComponent,
    CommentComponent,
    BodyMeasurementComponent,
    CompleteRegisterComponent,
    UserInfoComponent
  ],
  providers: [
  ]
})
export class UserModule { }
