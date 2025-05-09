import React, { FunctionComponent } from 'react';

import { useTheme } from '@mui/material/styles';

interface NoImagePlaceholderProps {
  className?: string;
}

const NoImagePlaceholder: FunctionComponent<NoImagePlaceholderProps> = ({ className }) => {
  const theme = useTheme();
  return (
    <svg className={className || ''} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173 125">
      <path
        strokeWidth={0}
        fill={theme.palette.grey[200]}
        d="M159.13,87.02l-9.68-80.92c-.23-1.91-1.21-3.65-2.69-4.78-1.39-1.06-3.09-1.5-4.79-1.25L5.72,19.81C2.15,20.33-.4,23.82.05,27.59l9.68,80.92c.23,1.91,1.21,3.65,2.69,4.78,1.14.87,2.49,1.32,3.88,1.32.3,0,.61-.02.92-.07l136.25-19.75c3.58-.52,6.12-4,5.67-7.77Z"
      />
      <rect
        fill={theme.palette.customBackground.main}
        stroke={theme.palette.text.secondary}
        strokeMiterlimit={10}
        strokeWidth={6}
        x="25.35"
        y="32.42"
        width="144.65"
        height="89.58"
        rx="4"
        ry="4"
      />
      <path
        fill="none"
        stroke={theme.palette.text.secondary}
        strokeMiterlimit={10}
        strokeWidth={6}
        d="M25.35,106.9l34.48-30.66c2.37-2.11,5.68-2.35,8.29-.62l30,19.97c2.7,1.8,6.14,1.46,8.51-.83l35.81-34.6c2.62-2.53,6.5-2.65,9.23-.28l18.33,15.83"
      />
      <ellipse
        fill="none"
        stroke={theme.palette.text.secondary}
        strokeMiterlimit={10}
        strokeWidth={6}
        cx="87.36"
        cy="59.79"
        rx="11.05"
        ry="10.95"
      />
    </svg>
  );
};

export default NoImagePlaceholder;
