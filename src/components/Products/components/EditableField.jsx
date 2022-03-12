import React from 'react';
import FileUpload from '../../FileUpload';

const EditableField = ({edit, field,value, onChange = () => {}, editClassname = '', type = 'text', children}) => {

  if(edit) {
    switch(type){
    case 'file':
      return (<FileUpload setFile={(file) => onChange(field, file)} />);
    case 'textfield':
      return (
        <textarea
          className={editClassname}
          style={{ resize: 'vertical', minHeight: '120px' }}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
        />);
    default:
      return(
        <input 
          className={editClassname}
          type="text"
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
        />
      );
    }
  }

  return (children);

};

export default EditableField;