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
            const response = await fetch(`http://34.142.129.98/listing/${listingId}`);
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

    return (
        <div className="listing-list">
            <div className="grid grid-cols-5 gap-4">
                {currentCart.map((item) => {
                    const listing = listings[item.listingId];
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
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => updateAmount(item.cartListingId, item.amount - 1)}
                                                    disabled={item.amount === 0}
                                                    style={{width: 25, height: 25}} // Adjust button dimensions
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    id={item.cartListingId}
                                                    className="form-control text-center w-10" // Adjust input width
                                                    value={item.amount}
                                                    onChange={(e) => {
                                                        const newValue = parseInt(e.target.value);
                                                        if (!isNaN(newValue)) { // Validate input as a number
                                                            updateAmount(item.cartListingId, newValue);
                                                        }
                                                    }}
                                                />
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => updateAmount(item.cartListingId, item.amount + 1)}
                                                    style={{width: 25, height: 25}}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                // Display empty content or loading indicator
                                <div className="listing-card-empty">
                                    {/* Content to display when listing data is missing */}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CartListingList;