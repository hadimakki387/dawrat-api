export interface UserInterface {
  id:string ;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  university: string;
  domain: string;
  currentYearOfStudying: string;
  phone?: string;
  reviewedDocuments?: string[];
}

export type createUserInterface = Pick<
  UserInterface,
  | "firstName"
  | "lastName"
  | "currentYearOfStudying"
  | "domain"
  | "email"
  | "university"
  | "phone"
>;
