import React, { useState } from 'react';
import '@/styles/globals.css';

// Define the Order interface
export interface Order {
  orderId: string;
  userId: number;
  sellerId: number;
  status: string;
  listingName: string;
  amount: number;
  photoUrl: string;
  totalPrice: number;
  dateBought: Date;
}

interface OrdersListSellProps {
  orders: Order[];
}

const OrdersListSell: React.FC<OrdersListSellProps> = ({ orders: initialOrders }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`http://34.142.129.98/order/update/${orderId}?status=${newStatus}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Status updated successfully');
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.orderId === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="listing-list">
      <div className="grid grid-cols-5 gap-4">
        {orders.map(order => (
          <div className="listing-card" key={order.orderId}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img className="w-full" src={order.photoUrl} alt={order.listingName} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{order.listingName}</div>
                <div className="listing-details">
                  <p>{order.status}</p>
                  <p>Total Price: IDR {order.totalPrice}</p>
                  <p>Id Pembeli: {order.userId}</p>
                  <p>Date Bought: {order.dateBought.toString()}</p>
                </div>
                <div className="mt-4">
                  <div className="relative inline-block text-left">
                    <select
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      value={order.status}
                    >
                      <option value="DIKEMAS">Dikemas</option>
                      <option value="DI_JALAN">Di jalan</option>
                      <option value="SUDAH_SAMPAI">Sudah Sampai</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersListSell;
