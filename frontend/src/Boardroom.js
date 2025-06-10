import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from './images/login.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const BoardroomDashboard = () => {
  const [username, setUsername] = useState('');
  const [department, setDepartment] = useState('');
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ date: '', time: '', agenda: '', invitees: '' });
  const [minutes, setMinutes] = useState('');
  const [boardReport, setBoardReport] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [activeView, setActiveView] = useState('datatable'); // Default view
  const [summary, setSummary] = useState('');
  const [savedMinutes, setSavedMinutes] = useState([]);
  const [isListening, setIsListening] = useState(false);


  const [selectedMeeting, setSelectedMeeting] = useState('');
const [filteredMinutes, setFilteredMinutes] = useState([]);

const filterMinutes = () => {
  const filtered = savedMinutes.filter(entry => entry.date === selectedMeeting);
  setFilteredMinutes(filtered);
};
  useEffect(() => {
    const storedDepartment = localStorage.getItem('department');
    const storedUsername = localStorage.getItem('username');
    if (storedDepartment) setDepartment(storedDepartment);
    if (storedUsername) setUsername(storedUsername);
    fetchBookings();

  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:3001/boardroom/bookings');
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings', err);
    }
  };


  // Inside your component, just before return:

const handleLogout = () => {
  localStorage.clear(); // Clear user data
  window.location.href = '/login'; // Or redirect to your login route
};

const handleBack = () => {
  
  window.history.back(); // Or use react-router's useNavigate()
};

  const generateSummary = () => {
    if (minutes.trim()) {
      setSummary(`Summary: ${minutes.slice(0, 100)}...`);
    } else {
      alert('Please enter meeting minutes first.');
    }
  };

  const saveMinutes = async () => {
    if (!minutes.trim()) {
      alert('Please enter meeting minutes before saving.');
      return;
    }

    const today = new Date().toLocaleDateString();
    const payload = { date: today, minutes, summary, username };
    try {
      await axios.post('http://localhost:3001/boardroom/minutes', payload);
      setSavedMinutes(prev => [...prev, { date: today, minutes, summary }]);
      setMinutes('');
      setSummary('');
    } catch (err) {
      console.error('Error saving meeting minutes', err);
    }
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in your browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscription(transcript);
      setMinutes(prev => prev + '\n' + transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      alert('Speech recognition error: ' + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, bookedBy: username, department };
      await axios.post('http://localhost:3001/boardroom/bookings', payload);
      setForm({ date: '', time: '', agenda: '', invitees: '' });
      fetchBookings();
      alert('Booking submitted successfully!');
    } catch (err) {
      console.error('Error submitting booking', err);
    }
  };

  const handleUploadReport = async () => {
    if (!boardReport) return;
    const formData = new FormData();
    formData.append('report', boardReport);
    try {
      await axios.post('http://localhost:3001/boardroom/boardreports', { report: formData, username });
      alert('Board report uploaded successfully');
    } catch (err) {
      console.error('Error uploading board report', err);
    }
  };

  return (
    <div>
      {/* Navbar */}
     <nav className="navbar navbar-expand-lg border-bottom shadow-lg p-2 mb-0 rounded-0 w-100" style={{ backgroundColor: 'black' }}>
  <div className="container-fluid d-flex align-items-center justify-content-between">
    <div className="d-flex align-items-center text-white">
      <img src={image1} alt="Login Icon" style={{ width: '40px', height: '40px' }} />
      <span className="ms-2 fw-bold">BOARDROOM DASHBOARD</span>
    </div>
    <div className="d-flex align-items-center">
      {/* Back Button */}
      <button className="btn btn-sm btn-outline-light me-2" onClick={handleBack}>
        🔙 Back
      </button>
      {/* Logout Button */}
      <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
    <div className="text-white">
      <h6 className="mb-1">Welcome, <i>{username || 'User'}</i></h6>
    </div>
  </div>
</nav>

      <div className="d-flex" style={{ minHeight: '100vh' }}>
        {/* Sidebar */}
        <div className="text-white p-4 shadow" style={{ width: '260px', backgroundColor: '#2c2f33', borderRight: '2px solid #444' }}>
          <h4 className="mb-4" style={{ fontWeight: 'bold', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
            📋 Meeting
          </h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <button className="btn w-100 text-start text-white" style={{ backgroundColor: '#3a3f44', border: 'none', borderRadius: '8px', padding: '10px 15px' }} onClick={() => setActiveView('datatable')}>
                📅 View Bookings
              </button>
            </li>
            <li className="nav-item mb-3">
              <button className="btn w-100 text-start text-white" style={{ backgroundColor: '#3a3f44', border: 'none', borderRadius: '8px', padding: '10px 15px' }} onClick={() => setActiveView('book')}>
                🏢 Book the Boardroom
              </button>
            </li>
            <li className="nav-item mb-3">
              <button className="btn w-100 text-start text-white" style={{ backgroundColor: '#3a3f44', border: 'none', borderRadius: '8px', padding: '10px 15px' }} onClick={() => setActiveView('enhancements')}>
                ✨ Boardroom Enhancements
              </button>
            </li>
            <li className="nav-item mb-3">
              <button className="btn w-100 text-start text-white" style={{ backgroundColor: '#3a3f44', border: 'none', borderRadius: '8px', padding: '10px 15px' }} onClick={() => setActiveView('minutes')}>
                📅 Previous Meeting Minutes
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          {activeView === 'book' && (
            <div className="card shadow p-4 mb-4">
              <h5>Book the Boardroom</h5>
              <form onSubmit={handleBooking}>
                <div className="mb-3">
                  <label>Date</label>
                  <input type="date" name="date" className="form-control" value={form.date} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label>Time</label>
                  <input type="time" name="time" className="form-control" value={form.time} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label>Agenda</label>
                  <input type="text" name="agenda" className="form-control" value={form.agenda} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label>Invitees (comma-separated emails)</label>
                  <input type="text" name="invitees" className="form-control" value={form.invitees} onChange={handleChange} required />
                </div>
                <button className="btn btn-primary w-100" type="submit">Submit Booking</button>
              </form>
            </div>
          )}

         {activeView === 'enhancements' && (
  <div className="card shadow p-4 mb-4">
    <h4 className="mb-4 text-center">✨ Boardroom Enhancements</h4>

    <div className="mb-4">
      <label className="form-label fw-bold">📝 Meeting Minutes</label>
      <textarea 
        className="form-control" 
        rows="3" 
        placeholder="Type meeting minutes here..." 
        value={minutes} 
        onChange={(e) => setMinutes(e.target.value)} 
      />
    </div>

    <div className="mb-4">
      <label className="form-label fw-bold">🎙️ Voice Transcription</label>
      <textarea 
        className="form-control" 
        rows="2" 
        readOnly 
        value={transcription} 
      />
      {isListening && <div className="text-success mt-2">🎧 Listening for input...</div>}
      <button className="btn btn-primary mt-2" onClick={startVoiceRecognition}>
        Start Voice Transcription
      </button>
    </div>

    <div className="mb-4">
      <label className="form-label fw-bold">📌 Summary</label>
      <textarea 
        className="form-control" 
        rows="2" 
        placeholder="Generate or write a summary..." 
        value={summary} 
        onChange={(e) => setSummary(e.target.value)} 
      />
      <button className="btn btn-warning mt-2" onClick={generateSummary}>
        🔍 Generate Summary
      </button>
    </div>

    <div className="mb-4 text-center">
      <button className="btn btn-success me-2" onClick={saveMinutes}>
        💾 Save Minutes
      </button>
    </div>

    <hr />

    <div>
      <h5 className="mb-3 text-center">📚 All Meeting Minutes</h5>
      {savedMinutes.length > 0 ? (
        <ul className="list-group">
          {savedMinutes.map((entry, index) => (
            <li key={index} className="list-group-item">
              <strong>{entry.date}:</strong> {entry.summary || entry.minutes}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted text-center">No minutes saved yet.</p>
      )}
    </div>
  </div>
)}

{activeView === 'minutes' && (
  <div className="card shadow p-4 mb-4">
    <h4 className="mb-4 text-center">📅 Previous Meeting Minutes</h4>

    <div className="mb-4">
      <h5 className="fw-bold">Select Meeting</h5>
      <div className="d-flex mb-3">
        <select 
          className="form-select me-2" 
          onChange={(e) => setSelectedMeeting(e.target.value)}
        >
          <option value="">Select by Date or Agenda</option>
          {savedMinutes.map((entry, index) => (
            <option key={index} value={entry.date}>
              {entry.date} - {entry.agenda || 'No Agenda'}
            </option>
          ))}
        </select>
        <button className="btn btn-secondary" onClick={filterMinutes}>
          View Minutes
        </button>
      </div>
    </div>

    <div className="mb-4">
      <h5 className="fw-bold">📚 Meeting Minutes</h5>
      {filteredMinutes.length > 0 ? (
        <ul className="list-group">
          {filteredMinutes.map((entry, index) => (
            <li key={index} className="list-group-item">
              <strong>{entry.date}:</strong> {entry.summary || entry.minutes}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted text-center">No minutes available for the selected meeting.</p>
      )}
    </div>

    <div className="mb-4 text-center">
      <button className="btn btn-primary me-2" onClick={() => setActiveView('enhancements')}>
        ✏️ Add New Minutes
      </button>
    </div>
  </div>

)}

     {activeView === 'datatable' && (
  <>
    <h5 className="mb-3">Current Bookings</h5>
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Agenda</th>
            <th>Booked By</th>
            <th>Department</th>
            <th>Invitees</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, idx) => (
              <tr key={idx}>
                <td>{new Date(booking.date).toLocaleDateString()}</td> {/* Ensure date is formatted */}
                <td>{booking.time}</td>
                <td>{booking.agenda}</td>
                <td>{booking.bookedBy}</td>
                <td>{booking.department}</td>
                <td>{Array.isArray(booking.invitees) ? booking.invitees.join(', ') : 'No invitees'}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6" className="text-center">No bookings yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  </>
)}
        </div>
      </div>
    </div>
  );
};

export default BoardroomDashboard;