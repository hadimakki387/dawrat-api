import { Schema, model, models } from "mongoose";

const studyListSchema = new Schema<any, any>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required:false
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  documents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
});

const Studylist = models.Studylist || model("Studylist", studyListSchema);

export default Studylist;
