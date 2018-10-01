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

  /**
   * If we need Patient and Member information, use API to get more information
   */
  patients: string[];
  members: string[];
}
// Organazation Data has been connected with server, the data has requried when a employee want to get admin access.