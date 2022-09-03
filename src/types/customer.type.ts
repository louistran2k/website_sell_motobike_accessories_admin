export interface Customer {
  citizenIdentification: string;
  lastName: string;
  firstName: string;
  gender: boolean | null;
  dateOfBirth: Date | null;
  address: string;
  phoneNumber: string;
  email: string;
  taxCode: string;
  accountId: string;
}
