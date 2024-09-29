import { CartItem } from '@webapp/sdk/types/cart-types';
import { ValueGetterParams } from 'ag-grid-community';
import React from 'react';

const CustomDetailCellRenderer: React.FC<ValueGetterParams> = (params) => {
  const { data } = params;

  // Custom logic to render details
  return (
    <div>
      <p>Order ID: {data.order_id}</p>
      <p>Products: {data.cart_items.map((item: CartItem) => item.product_name).join(', ')}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default CustomDetailCellRenderer;
