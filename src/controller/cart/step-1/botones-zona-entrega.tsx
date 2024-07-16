import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { User } from '@webapp/sdk/types/user-types';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface ZoneDeliverButtonsProps {
  className?: string;
  userData: User;
  setUser: (user: User) => void;
  onValidChange?: (isValid: boolean) => void;
}

const ZoneDeliverButtons: FunctionComponent<ZoneDeliverButtonsProps> = ({ userData, onValidChange, setUser }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { setUser: setUserData } = useUserData();
  const { setDeliverValue } = useMessageStore();

  const handleOnChange = async (selectedDelivery: string) => {
    if (onValidChange) {
      onValidChange(true);
    }

    setUser({ ...userData, delivery_zone: selectedDelivery });
    setUserData({ ...userData, delivery_zone: selectedDelivery });

    if (selectedDelivery === 'LBE') {
      setDeliverValue(2500);
    } else if (selectedDelivery === 'OZ') {
      setDeliverValue(3500);
    }
  };

  React.useEffect(() => {
    if (onValidChange) {
      onValidChange(!!userData.delivery_zone);
    }
  }, [userData, onValidChange]);

  return (
    <Stack gap={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="center"
        fontSize={isMobile ? '3vw' : '1.6vw'}
        sx={{ mb: 0, color: theme.palette.grey[900] }}
      >
        {formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.SELECTOR' })}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: 2,
          mb: 3,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Button
          onClick={() => handleOnChange('LBE')}
          color={userData.delivery_zone === 'LBE' ? 'primary' : 'unselected'}
          aria-label={formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.1' })}
        >
          {formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.1' })}
        </Button>
        <Button
          onClick={() => handleOnChange('OZ')}
          color={userData.delivery_zone === 'OZ' ? 'primary' : 'unselected'}
          aria-label={formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.2' })}
        >
          {formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.2' })}
        </Button>
      </Box>
    </Stack>
  );
};

export default ZoneDeliverButtons;
