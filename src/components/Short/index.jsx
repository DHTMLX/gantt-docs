import React from 'react';

import cssstyles from './styles.module.scss';

const Short = ({ children }) => {
  return (
    <p className={cssstyles.short}>{children}</p>
  );
};

export default Short;