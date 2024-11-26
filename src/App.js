import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileChosenText, setFileChosenText] = useState('No file chosen');
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loader state
    const navigate = useNavigate();

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            setSelectedFile(files[0]);
            setFileChosenText(`File chosen: ${files[0].name}`);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileChosenText(`File chosen: ${file.name}`);
        }
    };

    const handleUpload = () => {
        if (!selectedFile) {
            alert('Please select an image first.');
            return;
        }
    
        setLoading(true); // Start loading
    
        const formData = new FormData();
        formData.append('image', selectedFile);
    
        fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to upload image');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            setError('');
            navigate('/results'); // Navigate only on success
        })
        .catch(error => {
            console.error('Error uploading the image:', error);
            setError('Failed to process the image.');
        })
        .finally(() => {
            setLoading(false); // Stop loading
        });
    };

    return (
        <div style={{
            backgroundColor: '#0e1117',
            fontFamily: 'Inter, sans-serif',
            color: '#e2e8f0',
            margin: 0,
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}>
            {loading && (
                <div id="spinnerOverlay" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#1a202c',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    opacity: 0.9
                }}>
                    <div className="opposites">
                        <div className="opposites bl"></div>
                        <div className="opposites tr"></div>
                        <div className="opposites br"></div>
                        <div className="opposites tl"></div>
                    </div>
                </div>
            )}

            <div style={{
                backgroundColor: '#1a202c',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
                maxWidth: '600px',
                width: '100%',
                textAlign: 'center'
            }}>
                <h2 style={{
                    color: '#e2e8f0',
                    fontSize: '28px',
                    marginBottom: '20px',
                    fontWeight: 700,
                    letterSpacing: '-0.5px'
                }}>Upload Your Image</h2>
                
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{
                        border: '2px dashed #2d3748',
                        backgroundColor: isDragOver ? '#2d3748' : '#1a202c',
                        borderRadius: '12px',
                        padding: '30px 20px',
                        color: '#a0aec0',
                        fontSize: '16px',
                        marginBottom: '20px',
                        transition: 'background-color 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ marginBottom: '12px', color: '#63b3ed' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                    </div>
                    <p>Drag & drop your image here, or <label htmlFor="image_file" style={{ color: '#63b3ed', cursor: 'pointer', fontWeight: 600 }}>browse files</label></p>
                </div>
                
                <p style={{ color: '#a0aec0' }}>{fileChosenText}</p>
                
                <input
                    type="file"
                    id="image_file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                
                <button
                    onClick={handleUpload}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#63b3ed',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '16px',
                    }}
                    disabled={loading} // Disable button when loading
                >
                    Upload
                </button>

                {error && <p style={{ color: '#f56565', marginTop: '20px' }}>{error}</p>}
            </div>

            <style>
                <style>
                    {`
                        .opposites {
                            position: relative;
                            width: 60px;
                            height: 60px;
                        }
                        .opposites {
                            animation: opposites 2.5s ease-out 0s infinite;  
                        }
                        .tl, .tr, .br, .bl {
                            width: 30px;
                            height: 30px;
                            position: absolute;
                        }
                        .tl, .tr {
                            top: 0; 
                        }
                        .tr, .br {
                            left: 30px; 
                        }
                        .tl, .br {
                            animation: tlbr 2.5s ease-out 0s infinite;
                        }
                        .br, .bl {
                            top: 30px; 
                        }
                        .tl, .bl {
                            left: 0; 
                        }
                        .tr, .bl {
                            animation: trbl 2.5s ease-out 0s infinite;
                        }
                        .tl {
                            background: red;
                            transform-origin: bottom right;
                        }
                        .tr {
                            background: green; 
                            transform-origin: bottom left;
                        }
                        .br {
                            background: dodgerblue; 
                            transform-origin: top left;
                        }
                        .bl {
                            background: gold; 
                            transform-origin: top right;
                        }

                        @keyframes tlbr {
                            0% {transform: rotate(0);}
                            20% {transform: rotate(90deg);}
                            40% {transform: rotate(90deg);}
                            60% {transform: rotate(0);}
                        }
                        @keyframes trbl {
                            20% {transform: rotate(0);}
                            40% {transform: rotate(90deg);}
                            60% {transform: rotate(90deg);}
                            80% {transform: rotate(0);}
                        }
                        @keyframes opposites {
                            80% {transform: rotate(0deg);}
                            100% {transform: rotate(360deg);}
                        }
                    `}
                </style>
            </style>
        </div>
    );
}

export default App;
