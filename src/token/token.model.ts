import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import { ITokenDoc, ITokenModel } from './token.interfaces';

const tokenSchema = new mongoose.Schema<ITokenDoc, ITokenModel>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

const Token =mongoose.models.Token || mongoose.model<ITokenDoc, ITokenModel>('Token', tokenSchema);

export default Token;