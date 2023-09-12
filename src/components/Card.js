import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`px-3 relative py-2 rounded-lg w-[250px] ${className}`}>
      <div className='px-3 py-2'>{children}</div>
    </div>
  );
};

export default Card;
