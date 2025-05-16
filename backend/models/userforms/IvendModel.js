import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const ivendSchema = new Schema({
  fullname: { type: String, required: true },
  jobtitle: { type: String, required: true },
  store: { type: String, required: true },
  date: { type: Date, required: true },
  headofdepartmentname: { type: String, required: true },
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
  rights: [
    {
      item: { type: String },
      access: { type: String }
    }
  ],
  roles: [{ type: String }] // Checkbox selections
}, {
  timestamps: true,
  collection: 'ivendusers'  // ✅ Move collection name here
});

export default model('ivendusers', ivendSchema);
