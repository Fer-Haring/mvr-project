import { SelectChangeEvent, SxProps, Theme, Tooltip, alpha, styled } from '@mui/material';
import { updateProduct } from '@webapp/sdk/firebase/products/update-products';
import { Products } from '@webapp/sdk/users-types';
import InputField from '@webapp/web/components/form/input';
import Select from '@webapp/web/components/form/select';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

import EllipsisTooltip from './elipsis-tooltip';

interface EditableCellProps {
  initialValue: string;
  index: number;
  id: string;
  updateData: (rowIndex: number, columnId: string, value: unknown) => void | undefined;
  valueTypes?: 'text' | 'number' | 'bool' | 'select';
  sx?: SxProps<Theme>;
  productData: Products;
  options?: { value: string; label: string }[];
}

const EditableCell: FunctionComponent<EditableCellProps> = ({
  initialValue,
  index,
  id,
  updateData,
  sx,
  productData,
  valueTypes,
  options,
}) => {
  const [value, setValue] = useState(initialValue);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = (value: string) => {
    const { productId } = productData;
    updateProduct(productId, { ...productData, [id]: value });
  };
  const onBlur = () => {
    updateData(index, id, value);
    handleUpdate(value);
    setEditing(false);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSortCriteriaChange = (e: SelectChangeEvent<string>) => {
    setValue(e.target.value);
    handleUpdate(e.target.value);
  };

  return (
    <>
      {editing ? (
        valueTypes === 'select' ? (
          <CustomSelect
            labelId="product-currency-select-label"
            id="currency-select"
            value={productData.priceCurrency}
            onChange={(e) => handleSortCriteriaChange(e as SelectChangeEvent<string>)}
            onBlur={onBlur}
            options={options}
            onFocus={() => {
              setEditing(true);
              setTimeout(() => {
                inputRef.current && inputRef.current.autofocus;
              }, 0);
            }}
            sx={{ width: '100%' }}
          />
        ) : (
          <CustomInputField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type={valueTypes}
            onBlur={onBlur}
            onFocus={() => {
              setEditing(true);
              setTimeout(() => {
                inputRef.current && inputRef.current.autofocus;
              }, 0);
            }}
            aria-label="editable-cell"
            autoFocus={editing}
            variant="outlined"
          />
        )
      ) : (
        <Tooltip title={value} placement="top">
          <EllipsisTooltip
            onClick={() => setEditing(true)}
            onBlur={onBlur}
            value={value}
            sx={{
              cursor: 'pointer',
              textAlign: 'center',
              ...sx,
            }}
          />
        </Tooltip>
      )}
    </>
  );
};

export default EditableCell;

export const CustomInputField = styled(InputField)(({ theme }) => ({
  height: theme.spacing(2.5),
  borderRadius: theme.spacing(0.5),
  border: 'none',
  '& .MuiOutlinedInput-root': {
    height: theme.spacing(2.5),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
    '& .MuiOutlinedInput-input': {
      height: theme.spacing(2.5),
      paddingBlock: 0,
      borderRadius: theme.spacing(0.5),
      border: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: theme.spacing(0.5),
    },
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  height: theme.spacing(3),
  borderRadius: theme.spacing(0.5),
  border: 'none',
  '& .MuiOutlinedInput-root': {
    height: theme.spacing(3),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '& label.MuiInputLabel-root': {
    fontSize: 14,
    color: theme.palette.grey[800],
  },
  '& .MuiSelect-input': {
    height: theme.spacing(2),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '.MuiSelect-select': {
    height: theme.spacing(2),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    '&:focus': {
      borderRadius: theme.spacing(0.5),
      borderColor: theme.palette.grey[700],
    },
  },
}));
