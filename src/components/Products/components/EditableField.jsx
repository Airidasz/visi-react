import React from 'react';
import FileUpload from '../../FileUpload';

const EditableField = ({
  edit,
  field,
  value,
  onChange = () => {},
  editClassname = '',
  type = 'text',
  children,
  required = true,
  inputProps = {},
}) => {
  if (edit) {
    switch (type) {
      case 'file':
        return (
          <FileUpload
            setFile={(file) => onChange(field, file)}
            className={editClassname}
            {...inputProps}
          />
        );
      case 'textfield':
        return (
          <textarea
            className={editClassname}
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            required={required}
            {...inputProps}
          />
        );
      default:
        return (
          <input
            className={editClassname}
            type={type}
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            required={required}
            {...inputProps}
          />
        );
    }
  }

  return children;
};

export default EditableField;
