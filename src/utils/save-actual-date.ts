// 2023-05-19T07:01:12 +03:00
import moment from 'moment-timezone';

export function getCurrentDateInSpecificFormat() {
  // Ajustar a la zona horaria de Preferencias
  return moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DDTHH:mm:ss Z');
}
