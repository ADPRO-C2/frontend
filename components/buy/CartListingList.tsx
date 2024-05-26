import React, { useState, useEffect } from 'react';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import AllListingList, { Listing } from "@/components/buy/AllListingList";

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
    userId: number;
}

const CartListingList: React.FC<CartListingListProps> = ({ cartListings , userId}) => {
    const router = useRouter();

    const [currentCart, setCart] = useState<CartListing[]>(cartListings);
    const [listings, setListings] = useState<Record<string, Listing>>({});

    const fetchListing = async (listingId: string) => {
        try {
            const response = await fetch(`http://34.142.129.98/api/listing/${listingId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch listing with ID: ${listingId}`);
            }
            const listing = await response.json();
            setListings(prevListings => ({ ...prevListings, [listingId]: listing }));
        } catch (error) {
            console.error('Error fetching listing:', error);
        }
    };

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
            const response = await fetch('http://34.142.129.98/cartlisting/update?cartListingId=${cartListingId}&newAmount=${newAmount}', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                console.log('Amount updated successfully');
                setCart(prevCart =>
                    prevCart.map(item =>
                        item.cartListingId === cartListingId ? { ...item, amount: newAmount } : item
                    )
                );
            } else {
                console.error('Failed to update amount');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    const calculateTotalPrice = () => {
        return currentCart.reduce((total, item) => total + item.totalPrice, 0);
    };

    return (
        <div className="listing-list">
            <div className="grid grid-cols-5 gap-4">
                {currentCart.map((item) => {
                    const listing = listings[item.listingId] || {
                        name: '',
                        photoUrl: '',
                    };
                    return (
                        <div className="listing-card" key={item.cartListingId}>
                            {listing ? (
                                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                    <img className="w-full" src={listing.photoUrl} alt={listing.name} />
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{listing.name}</div>
                                        <div className="listing-details">
                                            <p>Total Price: {item.totalPrice}</p>
                                        </div>
                                        <div className="amount-input">
                                            <label htmlFor={item.cartListingId}>Amount:</label>
                                            <div className="inline-flex">
                                                <input
                                                    type="number"
                                                    id={item.cartListingId}
                                                    className="form-control text-center w-10"
                                                    value={item.amount}
                                                    onChange={(e) => {
                                                        const newAmount = parseInt(e.target.value);
                                                        if (!isNaN(newAmount)) {
                                                            updateAmount(item.cartListingId, newAmount);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <div className="inline-flex items-center rounded-md shadow-sm">
                                                <button
                                                    className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                                                    onClick={() => deleteCartListing(item.cartListingId)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                         className="w-4 h-4 mr-1">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <div className="listing-card-empty">
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="cart-total-container">
                <p className="text-right font-bold">Total Price: {calculateTotalPrice()}</p>
                <button
                    className="btn btn-primary float-right"
                    onClick={() => (window.location.href = 'http://localhost:3000/buy/CheckoutOrderPage')}
                    disabled={currentCart.length === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartListingList;