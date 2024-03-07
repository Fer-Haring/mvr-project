import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { SxProps, Theme, styled } from '@mui/material/styles';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

// Definición del estilo para CellsTypos
const CellsTypos = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  boxSizing: 'border-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  padding: theme.spacing(0.5),
}));

interface TooltipProps {
  value: string 
  sx?: SxProps<Theme>;
  onClick?: () => void;
  onBlur?: () => void;
}

const EllipsisTooltip: FunctionComponent<TooltipProps> = ({ value, sx, onClick, onBlur }) => {
  const [isEllipsis, setIsEllipsis] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const checkForEllipsis = () => {
    const current = textRef.current;
    if (current) {
      setIsEllipsis(current.clientWidth < current.scrollWidth);
    }
  };

  useEffect(() => {
    checkForEllipsis();
    window.addEventListener('resize', checkForEllipsis);
    return () => window.removeEventListener('resize', checkForEllipsis);
  }, [value]);

  return (
    <Tooltip title={isEllipsis ? value : ''} placement="top">
      <CellsTypos
        ref={textRef}
        onClick={onClick}
        onBlur={onBlur}
        sx={{
          cursor: 'pointer',
          textAlign: 'center',
          ...sx,
        }}
      >
        {value}
      </CellsTypos>
    </Tooltip>
  );
};

export default EllipsisTooltip;
