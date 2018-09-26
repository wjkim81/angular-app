export interface PatientInfoForm {
  hashKey: string;
  lastname: string;
  birthday: string;
  sex: string;
  valid: boolean;
}

export interface SpinePrescriptionForm {
  curveType: string;
  lumbarSpine: string;
  sagittalAlignment: string;
  risser: string; // Need to be converted to number before post
  // stage: string;
  curveStart1: string;
  cobbAng1: string; // Need to be converted to number before post
  curveEnd1: string;
  direction1: string;
  major1: string; // Need to be converted to boolean before post
  addCurve2: boolean;
  curveStart2: string;
  cobbAng2: string; // Need to be converted to number before post
  curveEnd2: string;
  direction2: string;
  major2: string; // Need to be converted to boolean before post
  addCurve3: boolean; // Need to be converted to number before post
  curveStart3: string;
  cobbAng3: string;
  curveEnd3: string;
  direction3: string;
  major3: string; // Need to be converted to boolean before post
  valid: boolean;
}

export interface DiagnosisForm {
  comment: string;
  valid: boolean;
}

export interface BodyMeasurementForm {
  height: string; // Need to be converted to number before post
  weight: string; // Need to be converted to number before post
  bust: string; // Need to be converted to number before post
  waist: string; // Need to be converted to number before post
  shoulder: string; // Need to be converted to number before post
  hip: string; // Need to be converted to number before post
  valid: boolean; // Need to be converted to number before post
}