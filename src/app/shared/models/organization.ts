import { Patient } from './patient';

export class Organization {
  _id: string;
  name: string;
  type: string;
  country: string;
  city: string;
  address: string;
  postCode: string;
  managerName: string;
  /**
   * If we need Patient and Member information, use API to get more information
   */
  //pateitns: Patient[];
  patients: string[];
  members: string[];
}