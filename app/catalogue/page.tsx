"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ListingList, { Listing } from '@/components/sell/ListingList';
import { GetServerSideProps } from 'next';
import { useVerifyMutation } from '@/redux/features/authApiSlice';
import { useGetProfileQuery } from '@/redux/features/authApiSlice';


export default function Page() {
    const [listingsData, setListings] = useState<Listing[] >();
    const [userId, setUserId] = useState<number>();
    const [verify, isLoading] = useVerifyMutation();

    //const { data: user, isLoading, isFetching, refetch } = useGetProfileQuery();

    const fetchAllListingsSeller = async (id: number) => {
      const response = await fetch(`http://34.142.129.98/api/seller-listings/${id}`)
      const data = await response.json();
      console.log(data);
      setListings(data);
      console.log(listingsData);
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
        console.log(listingsData)
    }, [userId]);
  
    return (
      <div>
        <Header />
        {listingsData && userId && <ListingList listings={listingsData} userId={userId} />}
      </div>
    );
}