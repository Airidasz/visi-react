import React from 'react';
import { Link } from 'react-router-dom';

const Status404Page = () => {
  return (
    <div className='page-view'>
      <div className='label mb-3 mt-4 d-flex justify-content-center h-100'>Puslapis nerastas</div>
      <Link className='btn-dark' to="/">Grįžti į pagrindinį puslapį</Link>
    </div>
  );
};

export default Status404Page;
