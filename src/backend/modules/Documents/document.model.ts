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
  ownerId: {
    type: String,
    required: true,
  },
  documents:{
    type:Array
  },
  url:{
    type:String
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  modifiedAt:{
    type:Date,
    default:Date.now()
  },
  upvotes:{
    type:Number,
    default:0
  },
  downvotes:{
    type:Number,
    default:0
  },
  
});

const Document = models.Document || model("Document", documentSchema);

export default Document;
