class PatientFile {
  type: number;
  name: string;
  filePath: string;
  date: string;
}

export class Patient {
  patientId: number;
  memberId: string;
  name: string;
  hospital: string;
  hospitalId: number;//string;
  age: number;
  birthday: string;
  sex: string;
  height: number;
  weight: number;
  type: string;
  risser: string;//number;
  apex1Start: string;
  apex1Cobb: number;
  apex1End: string;
  apex1Direction: string;
  apex2Start: string;
  apex2Cobb: number;
  apex2End: string;
  apex2Direction: string;
  apex3Start: string;
  apex3Cobb: number;
  apex3End: string;
  apex3Direction: string;
  bodySp: string;//number;
  bodyB: string;//number;
  bodyW: string;//number;
  bodyH: string;//number;
  bodyL: string;//number;
  bodyLh: string;//number;
  patientVisit: string;//string[];
}