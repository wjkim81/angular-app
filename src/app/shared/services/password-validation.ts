/**
 * https://scotch.io/@ibrahimalsurkhi/match-password-validation-with-angular-2
 * This shows how password and confirmPassword can be checked to be matched.
 */

import {AbstractControl} from '@angular/forms';

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    //console.log(`password: ${password}, confirmPassword: ${confirmPassword}`);
    if(password != confirmPassword) {
      //console.log('false');
      AC.get('confirmPassword').setErrors( {MatchPassword: true} )
    } else {
      //console.log('true');
      //return null <- This is wrong. We should change status corrently according to confirmPassword 
      AC.get('confirmPassword').setErrors(null);
    }
  }
}