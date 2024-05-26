"use client";

import React, { useState, useEffect } from 'react';
import OrdersListSell, { Order } from '@/components/sell/OrdersListSell';
import { useVerifyMutation } from '@/redux/features/authApiSlice';

export default function Page() {
    const [orders, setOrders] = useState<Order[]>();
    const [userId, setUserId] = useState<number>();
    const [verify, isLoading] = useVerifyMutation();

    //const { data: user, isLoading, isFetching, refetch } = useGetProfileQuery();

    const fetchAllListingsSeller = async (id: number) => {
      const response = await fetch(`http://34.142.129.98/order/seller/${id}`)
      const data = await response.json();
      console.log(data);
      setOrders(data);
      console.log(orders);
  };

    useEffect(() => {
      verify(undefined)
			.unwrap()
			.then((response) => {
        setUserId(response.id);
        fetchAllListingsSeller(response.id);
			});
    }, [userId]);
  
    return (
      <div>
        {orders && userId && <OrdersListSell orders={orders} />}
      </div>
    );
}