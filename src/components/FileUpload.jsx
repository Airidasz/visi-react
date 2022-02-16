import '../index.css';
import React, { useState, useRef, useEffect } from 'react';

const FileUpload = ({ setFile = () => {} }) => {
  const [file, setInternalFile] = useState({});
  const [hover, setHover] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setFile(file); 
  }, [file]);

  const clickFileInput = () => {
    if(ref.current) {
      ref.current.click();
    }
  };

  const upload = (e) => {
    setInternalFile(e.target.files[0]);
  };

  const uploadDrop = (e) => {
    e.preventDefault();
    setInternalFile(e.dataTransfer.files[0]);
  };

  return (
    <div className={`fileUpload ${hover ? 'hover' : ''}`} 
      onClick={clickFileInput} onDrop={uploadDrop} 
      onDragOver={(e) => e.preventDefault()} 
      onMouseEnter={() => setHover(true)}
      onDragEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onDragExitCapture={() => setHover(false)}
    >
      <input type="file" ref={ref} hidden onChange={upload}/>
      <label>{file.name || 'Upload...'}</label>
    </div>
  );
    
};

export default FileUpload;