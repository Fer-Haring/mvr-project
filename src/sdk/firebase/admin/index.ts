import SnackbarUtils from '@webapp/components/snackbar';
import { CompletedOrder } from '@webapp/sdk/actions/auth/types';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import { useCompletedOrdersStore } from '@webapp/store/orders/get-completed-orders';
import { get, getDatabase, push, ref, update } from 'firebase/database';

import { database } from '../firebase';

export const getDollarValue = async () => {
  const db = getDatabase();
  const dollarValueRef = ref(db, 'dollarValue/');
  try {
    const snapshot = await get(dollarValueRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Suponiendo que data o data.value es el array [1200]
      // Extrae el primer elemento del array para obtener el valor numérico
      const valueToSet = Array.isArray(data) ? data[0] : Array.isArray(data.value) ? data.value[0] : data.value;
      useDollarValue.getState().setDollarValue(valueToSet);
      return { value: valueToSet };
    } else {
      console.log('No data available at dollarValue/');
      return null;
    }
  } catch (error) {
    console.error('Error fetching dollar value:', error);
    return null;
  }
};

export const updateDollarValue = async (value: number) => {
  const db = getDatabase();
  const dollarValueRef = ref(db, 'dollarValue/');
  try {
    await update(dollarValueRef, { value: value });
    SnackbarUtils.success('Valor del dólar actualizado exitosamente');
  } catch (error) {
    SnackbarUtils.error('Error updating dollar value: ' + error);
  }
};

export const getCompletedOrders = async () => {
  const db = getDatabase();
  const ordersRef = ref(db, 'CompletedOrders/');
  try {
    const snapshot = await get(ordersRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      useCompletedOrdersStore.setState({ orders: data });
      return data;
    } else {
      console.log('No data available at orders');
      return null;
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return null;
  }
};

export const saveCompletedOrder = async (order: CompletedOrder, id: number) => {
  const db = getDatabase();
  const ordersRef = ref(db, 'CompletedOrders/' + id);
  try {
    await push(ordersRef, order);
  } catch (error) {
    SnackbarUtils.error('Error saving order: ' + error);
  }
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  const orderRef = ref(database, 'CompletedOrders/' + orderId);
  try {
    await update(orderRef, { status });
    SnackbarUtils.success('Estado del pedido actualizado con éxito');
    return { orderId, status };
  } catch (error) {
    console.error('Error actualizando el estado del pedido:', error);
    SnackbarUtils.error('Error al actualizar el estado del pedido');
    return null;
  }
};
