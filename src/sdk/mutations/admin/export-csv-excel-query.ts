import { useMutation } from '@tanstack/react-query';
import { exportCsvExcel } from '@webapp/sdk/actions/admin/export-csv-excel';

export function useExportCsvExcel() {
  return useMutation<Blob, Error, { fileFormat: string }>({
    mutationFn: ({ fileFormat }) => exportCsvExcel(fileFormat),
  });
}
