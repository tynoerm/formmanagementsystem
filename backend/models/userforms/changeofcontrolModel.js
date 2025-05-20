import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const changeofcontrolSchema = new Schema({
  name: { type: String, required: true },
  division: { type: String, required: true },
  department: {type: String, required: true},
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
  headofdept: {
    type: String,
    enum: ["pending", "approved", "rejected", "unapproved"],
    default: "unapproved",
    set: v => v === "" ? undefined : v
  },
  dateapprovedhd: {
    type: Date,
    default: null,
  },
  headofict: {
    type: String,
    enum: ["pending", "approved", "rejected", "unapproved"],
    default: "unapproved",
    set: v => v === "" ? undefined : v
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
