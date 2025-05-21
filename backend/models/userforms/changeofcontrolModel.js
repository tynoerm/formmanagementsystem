import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const changeofcontrolSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String },
  division: { type: String, required: true },
  department: {type: String},
  datesubmitted: { type: Date, required: true },
  workestimatedhours: { type: String },
  severity: { type: String },
  internalserviceorder: { type: String },
  proposedchange: { type: String },
  objectstobechanged: { type: String },
  purposeforchange: { type: String },
  changesmade: { type: String },
  changesconsultant: { type: String },
  changeddate: { type: Date },
  requestor: { type: String },
  requstordate: { type: Date },
 
  dateapprovedhd: {
    type: Date,
    default: null,
  },
   headofdept: {
     type: String,
  enum: ["approved", "rejected", "unapproved"],
  default: "unapproved",
  },
  headofict: {
       type: String,
  enum: ["approved", "rejected", "unapproved"],
  default: "unapproved",
  },
  dateapprovedict: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
  collection: 'changeofcontrol',
});

export default model('changeofcontrol', changeofcontrolSchema);
