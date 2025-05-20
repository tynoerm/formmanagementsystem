import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const stockTransferLocationSchema = new Schema({
  from: { type: Number, required: true },
  to: { type: Number, required: true },
}, { _id: false }); // _id false because it's a subdocument, optional

const meatmatrixSchema = new Schema({
  fullname: { type: String, required: true },
  jobtitle: { type: String, required: true },
  store: { type: String, required: true },
  department: {type: String, required: true},
  date: { type: Date, required: true },
  headofdepartmentname: { type: String },

  // Replace from/to with an array of stockTransferLocations
  stockTransferLocations: { type: [stockTransferLocationSchema], default: [] },

  authoriseddatabase: { type: String },
  datetermination: { type: Date },
  time: { type: String },   // or Date if you prefer
  terminatedby: { type: String },

  userCode: { type: String },
  userId: { type: String },
  costCenter: { type: String },
  stationNumber: { type: String },
  processId: { type: String },
  authorisedBy: { type: String },
  actionedBy: { type: String },
  date1: { type: Date },
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

  rights: [{ type: String }], // array of access rights

}, { timestamps: true,
    collection: 'meatmatrix'
});

export default model('meatmatrix', meatmatrixSchema);
