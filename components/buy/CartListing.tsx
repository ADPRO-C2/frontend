import React from 'react';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import {Listing} from "@/components/sell/ListingList";

export interface CartListing {
    cartListingId: string;
    listingId: string;
    userId: number;
    amount: number;
    totalPrice: number;
}

interface CartListingListProps {
    cartListings: CartListing[];
}

const CartListingList: React.FC<CartListingListProps> = ({ cartListings }) => {
    const router = useRouter();
}