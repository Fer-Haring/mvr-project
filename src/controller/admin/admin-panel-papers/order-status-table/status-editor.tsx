import { MenuItem, Select, SelectChangeEvent, styled } from '@mui/material';
import { ICellEditorParams } from 'ag-grid-community';
import React, { useState } from 'react';

const StatusEditor = (props: ICellEditorParams) => {
  const [value, setValue] = useState(props.value);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value);
    props.api.stopEditing();
  };

  return (
    <StyledSelect value={value} onChange={(e) => handleChange(e as SelectChangeEvent<string>)}>
      <StyledMenuItem value="pending">Pendiente</StyledMenuItem>
      <StyledMenuItem value="completed">Completado</StyledMenuItem>
      <StyledMenuItem value="canceled">Cancelado</StyledMenuItem>
    </StyledSelect>
  );
};

export default StatusEditor;

const StyledSelect = styled(Select)(({ theme }) => ({
  width: '100%',
  height: 30,
  padding: 0,
  color: theme.palette.text.primary,
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  color: theme.palette.common.black,
}));
