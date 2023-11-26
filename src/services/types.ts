export interface DropdownValue {
    value: any;
    label: string;
    group?: string;
    priority?: number;
  }

 export  interface UserI{
    id:string ;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    university: {
      id:string;
      title:string;
      abr:string;
    };
    domain: string;
    currentYearOfStudying: string;
    phone?: string;
  }