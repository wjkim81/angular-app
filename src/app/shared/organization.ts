import { Patient } from './patient';

export class Organization {
  _id: string;
  name: string;
  country: string;
  type: string;
  city: string;
  address: string;
  postCode: string;
  managerName: string;
  //pateitns: Patient[];
  patients: string[];
  members: string[];
}
