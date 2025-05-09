import { FormControl, styled } from '@mui/material';
import InputField from '@webapp/components/form/input';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface CustomBulkEditInputProps {
  className?: string;
  value: string | number;
  name: string;
  label: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}

const CustomBulkEditInput: FunctionComponent<CustomBulkEditInputProps> = ({
  className,
  value,
  name,
  label,
  type,
  onChange,
  autoComplete,
}) => {
  const { formatMessage } = useIntl();

  function getLabelKey(name: string): string {
    const upperCased = name.replace(/\s+/g, '').toUpperCase();
    return `FORM.LABEL.${upperCased}`;
  }

  return (
    <FormControl className={className} sx={{ width: '100%' }}>
      <CustomInputField
        name={name}
        label={formatMessage({ id: getLabelKey(label) })}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete || 'off'}
        size="small"
        variant="outlined"
        fullWidth
      />
    </FormControl>
  );
};

export default CustomBulkEditInput;

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
