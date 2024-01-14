export interface SolutionInterface {
  id: string;
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  doc: {
    name: string;
    size: number;
    key: string;
    url: string;
  };
  university: string;
  course: string;
  domain: string;
  document: string;
}
