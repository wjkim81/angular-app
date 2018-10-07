import { Organization } from './organization';

export class BodyMeasurement {
  _id: string;
  updatedBy: string;
  height: number;
  weight: number;
  shoulder: number;
  bust: number;
  waist: number;
  hip: number;
  createdAt: string;
  updatedAt: string;
}

export class SpineInfo {
  _id: string;
  updatedBy: string;
  type: string;
  risser: number;
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
  _id: string;
  updatedBy: string;
  filePath: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export class Comment {
  _id: string;
  updatedBy: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export class Patient {
  _id: string;

  hashKey: string;
  firstname: string;
  lastname: string;
  birthday: string;
  sex: string;

  /** Why not Oranization? We just need _id of Organization
   *  We will fetch organization data through api if we need more
   */
  // organization: Organization;
  organization: string;

  //patientId: string;
  bodyMeasurements: [BodyMeasurement];
  spineInfos: [SpineInfo];
  xRayFiles: [XRayFile];
  comments: [Comment];
  createdAt: string;
  updatedAt: string;
}