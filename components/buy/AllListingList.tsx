import React, { useState } from 'react';
import '@/styles/globals.css';
import { useRouter } from 'next/router';

export interface Listing {
    listingId: string;
    userId: number;
    name: string;
    description: string;
    photoUrl: string;
    price: number;
    stock: number;
    rateCondition: number;
}

interface AllListingListProps {
    listings: Listing[];
}

const AllListingList: React.FC<AllListingListProps> = ({ listings }) => {
    const router = useRouter();

    const [currentListings, setListings] = useState<Listing[]>(listings);

    const buyListing = async (listingId: string) => {
        try {
            const response = await fetch(`http://34.142.129.98/cartlistings/cart-listings/${listingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                console.log('CartListing berhasil dibuat');
            } else {
                console.error('Gagal membuat CartListing:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="listing-list">
            <div className="listing-list grid grid-cols-5 gap-4">
                {currentListings.map((listing: Listing) => (
                    <div className="listing-card" key={listing.listingId}>
                        <div className="max-w-sm rounded overflow-hidden shadow-lg">
                            <img className="w-full" src={listing.photoUrl} alt={listing.name}/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{listing.name}</div>
                                <div className="listing-details">
                                    <p>{listing.description}</p>
                                    <p>Price: IDR {listing.price}</p>
                                    <p>Stock: {listing.stock}</p>
                                    <p>Rate Condition: {listing.rateCondition}</p>
                                </div>

                                <div className="mt-2">
                                    <div className="inline-flex items-center rounded-md shadow-sm">
                                        <button className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center" onClick={() => buyListing(listing.listingId)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllListingList;