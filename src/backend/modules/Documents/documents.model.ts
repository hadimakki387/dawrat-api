import { Schema, model, models } from "mongoose";
import validator from "validator";

const documentSchema = new Schema<any, any>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  domain: {
    type: String,
  },
  university: {
    type: String,
  },
  currentYearOfStudying: {
    type: String,
  },
  course:{
    type:String,
    required:true
  },
  OwnerId: {
    type: String,
    required: true,
  },
  documents:{
    type:Array
  },
  url:{
    type:String
  },
  createdAu:{
    type:Date,
    default:Date.now()
  },
  modifiedAt:{
    type:Date,
    default:Date.now()
  }
  
});

const Document = models.Document || model("Document", documentSchema);

export default Document;
