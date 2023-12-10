export interface DocumentInterface {
  _id:string;
  id:string;
  title: string;
  description: string;
  domain: string;
  university: string;
  currentYearOfStudying: string;
  course: string;
  ownerId: string;
  doc:{
    name:string;
    size:number;
    key:string;
    url:string;
  }
  createdAt: string;
  modifiedAt: string;
  courseName:string;
  upvotes:number;
  downvotes:number;
  universityName:string;
}
