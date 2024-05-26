import React, {useState} from 'react';
import Header from '@/components/Header';
import CartListingList, { CartListing } from '@/components/buy/CartListingList';
import { useRouter } from 'next/router';
import {GetServerSideProps} from "next";
import UserOrderHistory, { Order } from '@/components/buy/UserOrderHistory';
import CheckoutButtons from '@/components/buy/CheckoutButtons';
import cartListingList from "@/components/buy/CartListingList";

const API_BASE_URL = `http://34.142.129.98/cartlisting/user/`;

interface CheckoutOrderPageProps {
    cartListings: CartListing[];
    userId: number;
}
const CheckoutOrderPage: React.FC<CheckoutOrderPageProps> = ({ cartListings: boughtCartListings, userId }) => {
    const router = useRouter();
    const [cartListings, setOrders] = useState<CartListing[]>(boughtCartListings);

    return (
        <div>
            <Header />
            <CheckoutButtons cartListings={cartListings} userId={userId}/>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<CheckoutOrderPageProps> = async (context) => {
    try {
        const userId = context.params?.userId ? parseInt(context.params.userId as string, 10) : 2;

        const apiUrl = `${API_BASE_URL}${1}`;
        const response = await fetch(apiUrl);
        const cartListings: CartListing[] = await response.json();

        return {
            props: {
                cartListings,
                userId: userId,
            },
        };
    } catch (error) {
        const userId = context.params?.userId ? parseInt(context.params.userId as string, 10) : 2;
        console.error('Error fetching data:', error);
        return {
            props: {
                cartListings: [],
                userId: userId,
            },
        };
    }
};

export default CheckoutOrderPage