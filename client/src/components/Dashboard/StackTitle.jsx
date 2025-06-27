// File: client/src/components/Dashboard/StackTitle.jsx

import React from 'react';
import PropTypes from 'prop-types';

const StackTitle = ({ title }) => (
  <div className="border-b pb-2">
    <h1 className="font-semibold text-zinc-800 text-center">{title}</h1>
  </div>
);

StackTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default StackTitle;
