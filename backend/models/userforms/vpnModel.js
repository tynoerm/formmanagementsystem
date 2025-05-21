import { Schema, model } from 'mongoose';

const vpnSchema = new Schema({
  // Requestor Info
  vpnRequestorname: { type: String, required: true },
   department: { type: String},
    username: { type: String },
  vpnRequestorjobtitle: { type: String, required: true },
  vpnRequestoremail: { type: String, required: true },

  // Head of Department Info
  headofdepartmentname: { type: String, required: true },
  headofdeptDepartment: { type: String, required: true },
  headofdeptjobtitle: { type: String, required: true },
  headofdeptemail: { type: String, required: true },

  // Access Request
  raccesstocolcomservers: { type: String, required: true },
  otherservices: { type: String, required: false },

  // Duration
  durationStartdate: { type: Date, required: true },
  durationEnddate: { type: Date, required: true },

  // Device Info
  computername: { type: String, required: true },
  assettag: { type: String, required: false },
  model: { type: String, required: false },
  operatingsystem: { type: String, required: false },

  // Approval Statuses

  deptManagerApproval: {
     type: String,
  enum: ["approved", "rejected", "unapproved"],
  default: "unapproved",
  },
  itManagerApproval: {
     type: String,
  enum: ["approved", "rejected", "unapproved"],
  default: "unapproved",
  },
  itExecutiveApproval: {
     type: String,
  enum: ["approved", "rejected", "unapproved"],
  default: "unapproved",
  },

  // IT Actions
  itauthourisedby: { type: String, required: false },
  itactionedby: { type: String, required: false },

}, {
  timestamps: true,
  collection: 'vpn',
});

export default model('vpn', vpnSchema);
