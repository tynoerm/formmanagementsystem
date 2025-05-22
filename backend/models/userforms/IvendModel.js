import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ivendSchema = new Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String },
    jobtitle: { type: String, required: true },
    store: { type: String, required: true },
    department: { type: String, required: true },
    date: { type: Date, required: true },
    headofdepartmentname: { type: String, required: true },
    deptmanagerapproval: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'unapproved'],
      default: 'unapproved',
    },
    itmanagerapproval: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'unapproved'],
      default: 'unapproved',
    },
    rights: [
      {
        item: { type: String },
        access: { type: String },
      },
    ],
    roles: [{ type: String }],
    agentname: { type: String },
    authorisedby: { type: String },
    actionedby: { type: String },
    reviewedby: {type: String},
  },
  {
    timestamps: true,
    collection: 'ivendusers',
  }
);

export default model('ivendusers', ivendSchema);
