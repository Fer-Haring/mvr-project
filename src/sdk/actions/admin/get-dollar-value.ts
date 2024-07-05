import { ValorDollarAPI } from '@webapp/sdk/types/dollar-value-types';

export async function getDollarValue(): Promise<ValorDollarAPI> {
  const URL = 'https://dolarapi.com/v1/dolares/blue';

  const response = await fetch(`${URL}`);

  const dollarValue = await response.json();
  return dollarValue;
}
