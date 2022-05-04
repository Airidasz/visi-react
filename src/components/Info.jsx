import React from 'react';
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip';

const Info = ({ title = '', placement = 'bottom', className = '' }) => {
  return (
    <Tooltip title={title} placement={placement}>
      <Icon icon="material-symbols:info-rounded" className={className} />
    </Tooltip>
  );
};

export default Info;
