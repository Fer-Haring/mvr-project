import { Stack, Typography } from '@mui/material';
import WalletImg from '@webapp/assets/images/empty-cart.png';
import { useIntl } from 'react-intl';

const CartEmptyState = () => {
	const {formatMessage} = useIntl();
  return (
    <Stack direction={'column'} gap={2} width={'100%'} sx={{justifyContent: 'center', alignItems: 'center'}}>
      <img src={WalletImg} alt="Empty cart" style={{
				width: '100%',
				maxWidth: '250px',
				margin: 'auto',
				display: 'block',
				opacity: 0.7,
				marginBottom: '120px',
				marginTop: '120px'
			}}/>
			<Typography variant="h2" fontWeight={600} sx={{ mb: 2, color: 'black', fontSize: 39 }}>
				{formatMessage({ id: 'CART.EMPTY.STATE.TITLE' })}
			</Typography>
			<Typography variant="h4" fontWeight={400} sx={{ mb: 2, color: 'black' }}>
				{formatMessage({ id: 'CART.EMPTY.STATE.SUBTITLE' })}
			</Typography>
    </Stack>
  );
};

export default CartEmptyState;
