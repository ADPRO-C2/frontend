"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import UserOrderHistory, { Order } from '@/components/buy/UserOrderHistory';
import { GetServerSideProps } from 'next';
import { useVerifyMutation } from '@/redux/features/authApiSlice';
import { useGetProfileQuery } from '@/redux/features/authApiSlice';


export default function Page() {
    const [orders, setOrders] = useState<Order[]>();
    const [userId, setUserId] = useState<number>();
    const [verify, isLoading] = useVerifyMutation();

    //const { data: user, isLoading, isFetching, refetch } = useGetProfileQuery();

    const fetchAllListingsSeller = async (id: number) => {
      const response = await fetch(`http://34.142.129.98/order/user/${id}`)
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

        //console.log(user?.id)
        console.log("hai")
        console.log(orders)
    }, [userId]);
  
    return (
      <div>
        {orders && userId && <UserOrderHistory orders={orders} userId={userId} />}
      </div>
    );
}