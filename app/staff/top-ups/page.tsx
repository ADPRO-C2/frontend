"use client";

import React, { useState, useEffect } from 'react';
import AllTopUpList , { TopUp } from '@/components/staff/AllTopUpList';
import { useVerifyMutation } from '@/redux/features/authApiSlice';
import {getAllTopUps} from "@/services/topUpService";
import AllListingList from "@/components/staff/AllListingList";

export default function Page() {
    const [topUpData, setTopUps] = useState<TopUp[]>();
    const [userId, setUserId] = useState<number>();
    const [verify, isLoading] = useVerifyMutation();

    //const { data: user, isLoading, isFetching, refetch } = useGetProfileQuery();

    const fetchAllTopUps = async () => {
        const data = await getAllTopUps()
        console.log(data);
        setTopUps(data);
        console.log(topUpData);
    };

    useEffect(() => {
        verify(undefined)
            .unwrap()
            .then((response) => {
                setUserId(response.id);
                fetchAllTopUps();
            });
    }, [userId]);

    return (
        <div>
            {topUpData && <AllTopUpList topUps={topUpData}/>}
        </div>
    );
}