export interface DocumentInterface {
  _id:string;
  id:string;
  title: string;
  description: string;
  domain: string;
  university: string;
  year: string;
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
  courseTitle:string;
  solution:string;
  language:string;
  yearName: string;
  languageName: string;
  semester: string;
  semesterName: string;
}
