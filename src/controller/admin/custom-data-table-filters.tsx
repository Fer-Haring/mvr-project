/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, TextField } from '@mui/material';
import Button from '@webapp/components/button';
import { IDoesFilterPassParams, IFilterComp, IFilterParams } from 'ag-grid-community';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

interface CustomFilterProps extends IFilterParams {
  colId: string;
  setFilter: (colId: string, filterValue: any) => void;
}

const CustomFilter = forwardRef<IFilterComp, CustomFilterProps>(({ colId, setFilter, filterChangedCallback }, ref) => {
  const [filterText, setFilterText] = useState('');

  const onFilterTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterText = event.target.value;
    setFilterText(newFilterText);
    
    setFilter(colId, {
      filterType: 'text',
      type: 'contains',
      filter: newFilterText
    });
    
    if (filterChangedCallback) {
      filterChangedCallback();
    }
  };

  const clearFilter = () => {
    setFilterText('');
    setFilter(colId, null);
    filterChangedCallback();
  };

  useImperativeHandle(ref, () => ({
    isFilterActive() {
      return !!filterText;
    },
    doesFilterPass(params: IDoesFilterPassParams) {
      const value = params.data[colId];
      if (!value) return false;
      return value.toString().toLowerCase().includes(filterText.toLowerCase());
    },
    getModel() {
      return filterText ? { value: filterText } : null;
    },
    setModel(model: any) {
      setFilterText(model ? model.value : '');
    },
    getGui() {
      return null as unknown as HTMLElement;
    },
  }));

  return (
    <Stack direction="column" spacing={2} alignItems="center" maxWidth="600px" sx={{ width: '100%', p: 2 }}>
      <TextField
        type="text"
        size="small"
        variant="outlined"
        fullWidth
        value={filterText}
        onChange={onFilterTextChange}
        placeholder="Filtrar por Nombre"
      />
      <Button variant="outlined" size="small" onClick={clearFilter}>
        Limpiar Filtro
      </Button>
    </Stack>
  );
});

CustomFilter.displayName = 'CustomFilter';

export default CustomFilter;
