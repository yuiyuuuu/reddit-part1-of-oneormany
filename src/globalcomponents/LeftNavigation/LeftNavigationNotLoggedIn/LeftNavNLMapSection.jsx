import React from "react";

const LeftNavNLMapSection = ({ items }) => {
  return (
    <div className='lnnl-mapparent'>
      {items.map((item) => (
        <div className='lnnl-mapchild'>{item}</div>
      ))}
    </div>
  );
};

export default LeftNavNLMapSection;
