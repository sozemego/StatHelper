import React from 'react';

const spinnerComponent = (props) => {
  return (
    <div>
      <div style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        transform: 'scale(0.25) translate(-50%, -100%)'
      }}>
        <div className="lds-microsoft" style={{width: '100%', height: '100%'}}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export const SpinnerComponent = spinnerComponent;