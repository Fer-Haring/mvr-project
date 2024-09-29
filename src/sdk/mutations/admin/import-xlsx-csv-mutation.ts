// En un archivo como useImportXlsx.ts
import { useMutation } from '@tanstack/react-query';
import { importXlsx } from '@webapp/sdk/actions/admin/import-xlsx-csv';



export function useImportXlsxCsv() {
  return useMutation<File, Error, File>({
    mutationFn: (file) => importXlsx(file),
  });
}
