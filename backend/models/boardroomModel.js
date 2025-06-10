import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const boardroomSchema = new Schema({
  user: {
    username: { type: String, required: true, unique: true },
    department: { type: String, required: true },
  },
  bookings: [{
    date: { type: Date, required: true },
    time: { type: String, required: true },
    agenda: { type: String, required: true },
    invitees: { type: [String], required: true }, // Array of emails
    bookedBy: { type: String, required: true }, // Username of the person who booked
  }],
  meetingMinutes: [{
    date: { type: Date, required: true },
    minutes: { type: String, required: true },
    summary: { type: String, required: true },
  }],
  boardReports: [{
    report: { type: String, required: true }, // Path to the uploaded report
    uploadedAt: { type: Date, default: Date.now },
  }],
}, { 
  timestamps: true,
  collection: 'boardroom' // Specify the collection name
});

export default model('boardroom', boardroomSchema);