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
  stage: string;
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