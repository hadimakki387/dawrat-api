// we are going to use the mongoose schema to create the schema for our domain model

import mongoose, { models } from "mongoose";

const domainSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
});

const Domain = models.Domain ||  mongoose.model("Domain", domainSchema);

export default Domain;
