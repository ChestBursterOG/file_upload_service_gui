import React, { useState } from 'react';
import { Container, Button, Typography, TextField } from '@mui/material';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post('http://localhost:3003/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setFileUrl(response.data);
      setUploadStatus('File uploaded successfully!');
      setFile(null); // Clear the selected file
    } catch (error) {
      setUploadStatus('Error uploading file.');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file" >
        <Button variant="contained" component="span" style={{marginBottom: 30}}>
          Select File
        </Button>
      </label>
      {file && (
        <Typography variant="body1" gutterBottom>
          Selected file: {file.name}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file}
        style={{marginBottom: 30}}
      >
        Upload
      </Button>
      {uploadStatus && <Typography>{uploadStatus}</Typography>}
      {fileUrl && (
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <Typography variant="subtitle1">File URL:</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={fileUrl}
            disabled
            inputProps={{ style: { overflowX: 'auto' } }} // Style for text field input
          />
        </div>
      )}
    </Container>
  );
}

export default App;
