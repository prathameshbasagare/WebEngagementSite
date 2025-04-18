import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const EmailUploader = () => {
  const [emails, setEmails] = useState([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Extract emails assuming they are in the first column
      const extractedEmails = json.slice(1).map(row => row[0]).filter(email => !!email);
      setEmails(extractedEmails);
    };

    reader.readAsArrayBuffer(file);
  };

  const sendEmails = async () => {
    if (emails.length === 0) {
      alert('No emails to send');
      return;
    }
    if (!subject.trim() || !body.trim()) {
      alert('Subject and Body are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/send-email', {
        emails,
        subject,
        body,
      });
      alert('Emails sent successfully: ' + response.data.message);
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Error sending emails');
    }
  };

  return (
    <div >
    <div  style={{
      padding: '24px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      maxWidth: '700px',
      marginTop:'24px',
      marginLeft:'400px'
    }}>
      <h2 style={{
        fontSize: '20px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '16px'
      }} className='flex justify-center'>Welcome to Email Campaign</h2>
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '4px'
        }}>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter email subject"
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '14px',
            color: '#111827',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            outline: 'none',
            marginTop: '4px'
          }}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '4px'
        }}>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter email body"
          rows="4"
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '14px',
            color: '#111827',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            outline: 'none',
            marginTop: '4px'
          }}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '4px'
        }}>Upload File:</label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{
            display: 'block',
            width: '100%',
            fontSize: '14px',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            padding: '8px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            outline: 'none',
            marginTop: '4px'
          }}
        />
      </div>
      <button
        onClick={sendEmails}
        style={{
          padding: '10px 16px',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '500',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          outline: 'none',
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e40af'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
      >
        Send Emails
      </button>
      <div style={{ marginTop: '20px' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '500',
          color: '#1f2937',
          marginBottom: '8px'
        }}>Extracted Emails:</h3>
        <ul style={{
          listStyleType: 'disc',
          paddingLeft: '20px',
          color: '#374151',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          {emails.map((email, index) => (
            <li key={index} style={{ marginBottom: '4px' }}>{email}</li>
          ))}
        </ul>
      </div>
    </div>
    </div>

  );
};

export default EmailUploader;