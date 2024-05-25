import React, {useState} from 'react';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import ListingList, {Listing} from "@/components/sell/ListingList";

const LOGIN_URL = 'http://34.87.10.122/login';
const PROFILE_URL = 'http://34.87.10.122/profile';

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

    const [currentCart, setCart] = useState<CartListing[]>(cartListings);

    const deleteCartListing = async (cartListingId: string) => {
        try {
            const response = await fetch(`http://34.142.129.98/cartlisting/delete/${cartListingId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                console.log('CartListing berhasil dihapus');
                setCart(prevCart => prevCart.filter(cartListing => cartListing.cartListingId != cartListingId));
            } else {
                console.error('Gagal menghapus CartListing:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateAmount = async (cartListingId: string, newAmount: number)=> {
        try {
            const response = await fetch(`http://34.142.129.98/cartlisting/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>

        </div>
    );
};

export default CartListingList;