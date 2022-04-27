import React, { useState, useRef, useEffect } from 'react';
import '../index.css';

const FileUpload = ({
  style,
  setFile = () => {},
  className = '',
  preview = null,
}) => {
  const [file, setInternalFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [hover, setHover] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!preview) return;

    try {
      const previewURL = new URL(preview);
      setImagePreview(previewURL.toString());
    } catch {}
  }, []);

  useEffect(() => {
    setFile(file);

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  }, [file]);

  const clickFileInput = () => {
    if (ref.current) {
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
    <div
      className={`file-upload${hover ? ' hover' : ''} ${className}`}
      style={style && style}
      onClick={clickFileInput}
      onDrop={uploadDrop}
      onDragOver={(e) => e.preventDefault()}
      onMouseEnter={() => setHover(true)}
      onDragEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onDragExitCapture={() => setHover(false)}
    >
      <img
        style={{ opacity: 0.8, position: 'absolute' }}
        src={imagePreview}
        className="w-100 h-100"
      />
      <input type="file" ref={ref} hidden onChange={upload} />
      <label>{!imagePreview && 'Upload...'}</label>
    </div>
  );
};

export default FileUpload;
