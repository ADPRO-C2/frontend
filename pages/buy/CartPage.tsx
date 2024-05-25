import React, {useState} from 'react';
import Header from '@/components/Header';
import CartListingList, { CartListing } from '@/components/buy/CartListingList';
import { useRouter } from 'next/router';
import {GetServerSideProps} from "next";

const LOGIN_URL = 'http://34.87.10.122/login';
const PROFILE_URL = 'http://34.87.10.122/profile';
const API_BASE_URL = `http://34.142.129.98/cartlisting/user`;

interface CartPageProps {
    cartListings: CartListing[],
    userId: number
}
const CartPage: React.FC<CartPageProps> = ({ cartListings: initialCart, userId }) => {
    const router = useRouter();
    const [cartListings, setCart] = useState<CartListing[]>(initialCart);

    return (
        <div>
            <Header />
            <CartListingList cartListings={cartListings} userId={userId}/>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<CartPageProps> = async (context) => {
    try {
        const userId = context.params?.userId ? parseInt(context.params.userId as string, 10) : 2;

        const apiUrl = `${API_BASE_URL}/user?userId=0`;
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

export default CartPage