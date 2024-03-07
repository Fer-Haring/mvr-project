import { FormControl, styled } from '@mui/material';
import InputField from '@webapp/web/components/form/input';
import { ChangeEvent, FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface CustomInputProps {
  className?: string;
  product: string | number | boolean;
  name: string;
  label: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  autoComplete: string;
}

const CustomInput: FunctionComponent<CustomInputProps> = ({ product, name, label, type, onChange, autoComplete }) => {
  const { formatMessage } = useIntl();

  return (
    <FormControl sx={{ width: '100%' }}>
      <CustomInputField
        name={name}
        label={formatMessage({ id: `ADD.NEWPRODUCT.LABEL.${label}` })}
        type={type}
        value={product}
        onChange={(e) => {
          onChange(e);
        }}
        autoComplete={autoComplete}
        size="small"
        aria-hidden="true"
        aria-label={formatMessage({ id: `ADD.NEWPRODUCT.LABEL.${label}` })}
        sx={{
          width: '100%',
        }}
      />
    </FormControl>
  );
};

export default CustomInput;

export const CustomInputField = styled(InputField)(({ theme }) => ({
  height: theme.spacing(5),
  borderRadius: theme.spacing(0.5),
  border: 'none',
  '& label': {
    fontSize: 16,
    color: theme.palette.grey[200],
  },
  '& .MuiOutlinedInput-root': {
    height: theme.spacing(5),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
    '& .MuiOutlinedInput-input': {
      height: theme.spacing(5),
      paddingBlock: 0,
      borderRadius: theme.spacing(0.5),
      border: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: theme.spacing(0.5),
    },
  },
}));
