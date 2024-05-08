import React from 'react';
import '@/styles/globals.css';

// Definisikan tipe properti untuk listings
export interface Listing {
  listing_id: string;
  userId: string;
  name: string;
  description: string;
  photoUrl: string;
  price: number;
  stock: number;
  rateCondition: number;
}

// Tambahkan tipe properti untuk listings
interface ListingListProps {
  listings: Listing[];
}

const ListingList: React.FC<ListingListProps> = ({ listings }) => {
  return (
    <div className="listing-list">
      <div className="listing-list grid grid-cols-5 gap-4">
        {listings.map(listing => (
          <div className="listing-card" key={listing.listing_id}>
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
                <div className="mt-4">
                  <a href="#" className="inline-block">
                    <button
                      className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                      type="button">
                      Edit Listing
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                      </svg>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};  

export default ListingList;
