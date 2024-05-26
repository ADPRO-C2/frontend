import React, {useEffect, useState} from 'react';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { Order } from '@/components/buy/UserOrderHistory';
import { CartListing } from '@/components/buy/CartListingList';

interface CheckoutButtonsProps {
    cartListings: CartListing[];
    userId: number;
}

const CheckoutButtons: React.FC<CheckoutButtonsProps> = ({ cartListings, userId }) => {
    const router = useRouter();

    const [boughtCartListings, setCartListings] = useState<CartListing[]>(cartListings);
    const [totalCost, setTotalCost] = useState(0);
    const [userBalance, setBalance] = useState(0);

    useEffect(() => {
        const fetchCartListings = async () => {
            await fetchAllCartListings(userId);
        };
        fetchCartListings();
    }, [userId]);

    const fetchAllCartListings = async (userId: number) => {
        try {
            const response = await fetch(`http://34.142.129.98/cartlisting/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCartListings(data);
            } else {
                console.error('Failed to fetch cart listings:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const createOrders = async (cartListings: CartListing[]) => {
        for (const cartlisting of cartListings) {
            try {
                const response = await fetch(`http://34.142.129.98/order/create/${cartlisting.cartListingId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    console.log('Order created for listing:', cartlisting.cartListingId);
                } else {
                    console.error('Failed to create order:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const findTotalCost = (cartListings: CartListing[]) => {
        let totalCost = 0;

        for (const cartListing of cartListings) {
            totalCost += cartListing.totalPrice;
        }

        return totalCost;
    };

    useEffect(() => {
        setTotalCost(findTotalCost(boughtCartListings)); // Update totalCost on cartListings change
    }, [boughtCartListings]);

    const getBalance = async () => {
        console.log("Fetching user balance (placeholder)");
        return 0; // Replace with actual balance or null if not available
    };

    return (
        <div className="listing-list">
            <div className="flex justify-center my-4">
                <span className="text-lg font-bold">Total Cost: IDR {totalCost}</span>
            </div>
            <div className="flex justify-center my-4">
                <span className="text-lg font-bold">Your Balance: IDR {userBalance}</span>
            </div>
            <div className="flex justify-center my-8">
                <a href="/buy/CartPage"
                   className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                    Return to Cart
                </a>
            </div>

            <div className="flex justify-center my-8">
                <a href="/buy/OrderHistoryPage"
                   className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                    Checkout
                </a>
            </div>
        </div>
    );
};

export default CheckoutButtons;