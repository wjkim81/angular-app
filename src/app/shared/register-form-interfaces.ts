export interface PatientInfoForm {
  lastname: string;
  birthday: string;
  sex: string;
  valid: boolean;
}

export interface SpineDescriptionForm {
  curveType: string;
  lumbarSpine: string;
  sagittalAlignment: string;
  risser: number;
  // stage: string;
  curveStart1: string;
  cobbAng1: number;
  curveEnd1: string;
  direction1: string;
  major1: boolean;
  curveStart2: string;
  cobbAng2: number;
  curveEnd2: string;
  direction2: string;
  major2: boolean;
  curveStart3: string;
  cobbAng3: number;
  curveEnd3: string;
  direction3: string;
  major3: boolean;
  valid: boolean;
}
