import React, {useState} from 'react';
import Header from '@/components/Header';
import CartListingList, { CartListing } from '@/components/buy/CartListingList';
import { useRouter } from 'next/router';
import ListingList, {Listing} from "@/components/sell/ListingList";

const LOGIN_URL = 'http://34.87.10.122/login';
const PROFILE_URL = 'http://34.87.10.122/profile';
const API_BASE_URL = 'http://34.142.129.98/cartlisting/user/'||'http://localhost:8080/cartlisting/user/';

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
            <CartListingList cartListings={cartListings} userId={2}/>
        </div>
    );
}

export default CartPage