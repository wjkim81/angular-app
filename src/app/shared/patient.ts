class PatientFile {
  type: number;
  name: string;
  filePath: string;
  date: string;
}

export class Patient {
  patientId: string;
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
  apexStart1: string;
  cobbAng1: number;
  apexEnd1: string;
  direction1: string;
  apexStart2: string;
  cobbAng2: number;
  apexEnd2: string;
  direction2: string;
  apexStart3: string;
  cobbAng3: number;
  apexEnd3: string;
  direction3: string;
  shoulder: number;
  bust: number;
  waist: number;
  hip: number;
  lumber: number;
  lumberHeight: number;
  visitDays: string;//string[];
}