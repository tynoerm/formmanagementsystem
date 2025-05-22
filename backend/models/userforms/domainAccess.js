import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const domainSchema = new Schema({
  fullname: { type: String, required: true },
  jobtitle: { type: String, required: true },
  department: { type: String, required: true },
  division: { type: String, required: true },
  managersname: { type: String, required: true },
  date: { type: Date, required: true },

  username: { type: String },
  domain: { type: String },
  computername: { type: String },
  authorisedby: { type: String },
  date1: { type: Date },

  organisationunit: {
    type: String
  },

  headofdepartmentname: { type: String },
  deptmanagerapproval: {
    type: String,
    enum: ["pending", "approved", "rejected", ""],
    default: "pending",
  }, // Optional, filled by ICT
  itmanagerapproval: {
    type: String,
    enum: ["pending", "approved", "rejected", ""],
    default: "pending",
  },   // Optional, filled by ICT
  memberships: [{ type: String }],
}, {
  timestamps: true,
  collection: 'domainaccess' // ✅ This is now correctly placed and separated
});

export default model('domainaccess', domainSchema);
