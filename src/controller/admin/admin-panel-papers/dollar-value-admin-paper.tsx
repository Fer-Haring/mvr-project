import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import InputField from '@webapp/components/form/input';
// import { useUpdateDollarValue } from '@webapp/sdk/mutations/admin/update-dollar-value-mutation';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { CustomAdminPaper } from './papers-styles';

const DollarValueInputPaper: FunctionComponent = () => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { dollarValue } = useDollarValue();
  // const { mutate } = useUpdateDollarValue();

  console.log(dollarValue);

  const [inputValue, setInputValue] = useState(
    Object.values(dollarValue?.value)[0] ? Object.values(dollarValue?.value)[0] : dollarValue.value
  );

  useEffect(() => {
    if (dollarValue?.value !== undefined && dollarValue.value.toString() !== inputValue) {
      setInputValue(Object.values(dollarValue?.value)[0]);
    }
  }, [dollarValue, inputValue]);

  // const handleUpdateDollarValue = async (event: ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   setInputValue(value);
  //   const parsedValue = parseFloat(value);
  //   if (!isNaN(parsedValue)) {
  //     setDollarValue(parsedValue);
  //     mutate({ dollarValue: parsedValue });
  //   }
  // };

  return (
    <CustomAdminPaper>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: 2,
          justifyContent: 'center',
          flexDirection: 'column',
          alignContent: 'center',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.grey[800],
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 3,
          }}
        >
          {formatMessage({ id: 'ADMIN.DOLLAR.VALUE' })}
        </Typography>
        <InputField
          name="dollarValue"
          type="number"
          value={inputValue}
          // onChange={handleUpdateDollarValue}
          hidden
          size="small"
          aria-hidden="true"
          aria-label={formatMessage({ id: 'COMMON.DOLLAR.VALUE' })}
          disabled={true}
          sx={{
            paddingX: theme.spacing(6),
            '& .MuiOutlinedInput-root': {
              // borderRadius: '0px',
              backgroundColor: theme.palette.common.white,
            },
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
              display: 'none',
            },
            '& input[type=number]': {
              MozAppearance: 'textfield',
            },
            '& input': {
              textAlign: 'center',
              color: theme.palette.grey[800],
              fontWeight: 'bold',
              paddingRight: '0px',
            },
          }}
        />
      </Box>
    </CustomAdminPaper>
  );
};

export default DollarValueInputPaper;
