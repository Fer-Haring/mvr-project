import SnackbarUtils from '@webapp/components/snackbar';
import { CompletedOrder } from '@webapp/sdk/types/user-types';
import { useCompletedOrdersStore } from '@webapp/store/orders/get-completed-orders';
import { get, getDatabase, push, ref, update } from 'firebase/database';

import { database } from '../firebase';

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
