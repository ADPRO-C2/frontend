import React, { useState } from 'react';
import Header from '@/components/Header';
import OrdersListSell, { Order } from '@/components/sell/OrdersListSell';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

const API_URL = 'http://34.142.129.98/order/seller/2'; // Ganti dengan URL API Anda

interface OrdersManagementPageProps {
  orders: Order[];
}

const OrdersManagementPage: React.FC<OrdersManagementPageProps> = ({ orders: initialOrders }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  return (
    <div>
      <Header />
      <OrdersListSell orders={orders} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<OrdersManagementPageProps> = async () => {
  try {
    const response = await fetch(API_URL);
    const orders: Order[] = await response.json();
    return {
      props: {
        orders,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        orders: [],
      },
    };
  }
};

export default OrdersManagementPage;