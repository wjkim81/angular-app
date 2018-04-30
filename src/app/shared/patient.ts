import { Organization } from './organization';


class bodyMeasurement {
  updatedBy: string;
  height: number;
  weight: number;
  shoulder: number;
  bust: number;
  waist: number;
  hip: number;
  lumber: number;
  lumberHeight: number;
}

class spineInfo{
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
}

class xRayFile {
  updatedBy: string;
  filePath: string;
}

class threeDFile {
  updatedBy: string;
  filePath: string;
}

export class Patient {
  _id: string;

  name: string;
  birthday: string;
  sex: string;

  organization: string;

  patientId: string;
  bodyMeasurements: [bodyMeasurement];
  spineInfos: [spineInfo];
  xRayFiles: [xRayFile];
  threeDFiles: [threeDFile];
  patientVisits: [string];
}