import React from 'react';
import '@/styles/globals.css';
import { useRouter } from 'next/router';

export interface CartListing {
    cartListingId: string;
    listingId: string;
    userId: number;
    amount: number;
    totalPrice: number;
}