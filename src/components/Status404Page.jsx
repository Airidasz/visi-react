import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getRandomInt } from './Extras';

const Status404Page = () => {
  const emoji = ['😔🤙', '😳', '🙃', '🛑', '🙄', '⚠️', '🚫', '⛔'];
  const [value] = useState(getRandomInt(emoji.length));

  return (
    <>
      <div className="mt-5" style={{ fontSize: '15rem', userSelect: 'none' }}>
        {emoji[value]}
      </div>
      <div className="label mb-3 mt-4 d-flex justify-content-center h-100">
        Puslapis nerastas
      </div>
      <Link className="btn-dark" to="/">
        Grįžti į pagrindinį puslapį
      </Link>
    </>
  );
};

export default Status404Page;
