import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface Step3Props {
  step: number;
  navigate: (path: string) => void;
}

export const Step3: FunctionComponent<Step3Props> = ({ step, navigate }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  return (
    <>
      {step === 3 && (
        <Stack direction={'column'} gap={2} width={'100%'} justifyContent={'center'} alignItems={'center'}>
          <motion.div
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],
            }}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 42,
            }}
          >
            <CheckCircleOutlineRoundedIcon sx={{ color: theme.palette.success.main, fontSize: 250 }} />
          </motion.div>
          <Typography
            variant="h4"
            fontWeight={600}
            textAlign="center"
            fontSize={60}
            sx={{ mb: 1, color: theme.palette.grey[900] }}
          >
            {formatMessage({ id: 'CART.PAYMENT.SUCCESS' })}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={600}
            textAlign="center"
            fontSize={40}
            sx={{ mb: 4, color: theme.palette.grey[900] }}
          >
            {formatMessage({ id: 'CART.PAYMENT.SUCCESS.TITLE' })}
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')} sx={{ maxWidth: 300 }}>
            {formatMessage({ id: 'CART.PAYMENT.SUCCESS.BUTTON.BACK.HOME' })}
          </Button>
        </Stack>
      )}
    </>
  );
};
