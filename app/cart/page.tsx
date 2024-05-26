"use client";

import React, { useState, useEffect } from 'react';
import ListingList, { Listing } from '@/components/sell/ListingList';
import { GetServerSideProps } from 'next';
import { useVerifyMutation } from '@/redux/features/authApiSlice';
import { useGetProfileQuery } from '@/redux/features/authApiSlice';
import CartListingList, { CartListing } from '@/components/buy/CartListingList';


export default function Page() {
    const [cartListings, setCart] = useState<CartListing[]>();
    const [userId, setUserId] = useState<number>();
    const [verify, isLoading] = useVerifyMutation();

    //const { data: user, isLoading, isFetching, refetch } = useGetProfileQuery();

    const fetchAllListingsSeller = async (id: number) => {
      const response = await fetch(`http://34.142.129.98/cartlisting/user/${id}`)
      const data = await response.json();
      console.log(data);
      setCart(data);
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
        console.log(cartListings)
    }, [userId]);
  
    return (
      <div>
            {cartListings && userId && <CartListingList cartListings={cartListings} userId={userId}/>}
      </div>
    );
}