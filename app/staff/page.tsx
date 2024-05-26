"use client";

import React, { useState, useEffect } from 'react';
import ListingList, { Listing } from '@/components/staff/ListingList';
import { GetServerSideProps } from 'next';
import { useVerifyMutation } from '@/redux/features/authApiSlice';
import { useGetProfileQuery } from '@/redux/features/authApiSlice';


export default function Page() {
    const [listings, setListings] = useState<Listing[] >();
    const [verify, isLoading] = useVerifyMutation();

    //const { data: user, isLoading, isFetching, refetch } = useGetProfileQuery();

    const fetchAllListings = async () => {
      const response = await fetch(`http://34.87.41.75/staff/reported-listing`)
      const data = await response.json();
      setListings(data);
    };

    useEffect(() => {
      verify(undefined)
			.unwrap()
			.then((response) => {
              fetchAllListings();
			});
    }, []);
  
    return (
      <div>
        {listings && <ListingList listings={listings}/>}
      </div>
    );
}