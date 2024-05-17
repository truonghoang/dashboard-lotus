// material-ui
import React from 'react';
import './loader.scss';
// loader style

// ==============================|| Loader ||============================== //

const Loader = () =>  (
  <div className="wrap_loader">
    <div className="center">
      {[...Array(10)].map((_, index) => {
        return <div key={index} className="wave"></div>;
      })}
    </div>
    <span className="title_loading">Loading ....</span>
  </div>
);

export default Loader;
