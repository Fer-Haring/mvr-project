import { Checkbox } from '@mui/material';
import React from 'react';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const HeaderCheckbox: React.FunctionComponent = () => {
  return (
    <div>
      <Checkbox {...label} />
    </div>
  );
};

export default HeaderCheckbox;
