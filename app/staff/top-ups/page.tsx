"use client";

import React, { useState, useEffect } from 'react';
import OrdersListSell, { Order } from '@/components/staff/OrdersListSell';
import { useVerifyMutation } from '@/redux/features/authApiSlice';
import {getAllTopUps} from "@/services/topUpService";

export default function Page() {
    const [orders, setOrders] = useState<Order[]>();
    const [userId, setUserId] = useState<number>();
    const [verify, isLoading] = useVerifyMutation();

    //const { data: user, isLoading, isFetching, refetch } = useGetProfileQuery();

    const fetchAllListingsSeller = async () => {
        const data = await getAllTopUps()
        console.log(data);
        setOrders(data);
        console.log(orders);
    };

    useEffect(() => {
        verify(undefined)
            .unwrap()
            .then((response) => {
                setUserId(response.id);
                fetchAllListingsSeller();
            });
    }, [userId]);

    return (
        <div>
        </div>
    );
}