import { Organization } from './organization';


export class BodyMeasurement {
  updatedBy: string;
  height: number;
  weight: number;
  shoulder: number;
  bust: number;
  waist: number;
  hip: number;
  lumber: number;
  lumberHeight: number;
  createdAt: string;
  updatedAt: string;
}

export class SpineInfo {
  updatedBy: string;
  type: string;
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
  createdAt: string;
  updatedAt: string;
}

export class XRayFile {
  updatedBy: string;
  filePath: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export class ThreeDFile {
  updatedBy: string;
  filePath: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export class Patient {
  _id: string;

  firstname: string;
  lastname: string;
  birthday: string;
  sex: string;

  organization: string;

  //patientId: string;
  bodyMeasurements: [BodyMeasurement];
  spineInfos: [SpineInfo];
  xRayFiles: [XRayFile];
  threeDFiles: [ThreeDFile];
  visitedDays: [string];
  createdAt: string;
  updatedAt: string;
}