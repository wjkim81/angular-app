import { Organization } from './organization';

export class Member {
  _id: string;
  username: string;
  password: string;
  usertype: string;
  admin: boolean;
  firstname: string;
  lastname: string;
  organization: Organization;
  subject: string;
  //city: string;
  //address: string;
  //postCode: string;
  managerName: string;
  phoneNum: string;
  mobileNum: string;
  email: string;
}

// Synced Data with server, some modified required, and it will be feature change.