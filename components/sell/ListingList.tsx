import React, { useState } from 'react';
import '@/styles/globals.css';

export interface Listing {
  description: string;
  listingId: string;
  name: string;
  photoUrl: string;
  price: number;
  rateCondition: number;
  stock: number;
  userId: number;
}

interface ListingListProps {
  listings: Listing[];
  userId: number;
}

const ListingList: React.FC<ListingListProps> = ({ listings, userId }) => {
  const [currentListings, setListings] = useState<Listing[]>(listings);

  const deleteListing = async (listingId: string) => {
    try {
      const response = await fetch(`http://34.142.129.98/api/delete-listing/${listingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        console.log('Listing berhasil dihapus');
        setListings(prevListings => prevListings.filter(listing => listing.listingId !== listingId));
      } else {
        console.error('Gagal menghapus listing:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSortedByName = async () => {
    try {
      const response = await fetch(`http://34.142.129.98/api/seller-listings/sorted-by-name/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        console.log("masukk sortet");
        const sortedListings = await response.json();
        console.log(sortedListings);
        setListings(sortedListings);
      } else {
        console.error('Gagal mengambil listing:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSortedByPrice = async () => {
    try {
      const response = await fetch(`http://34.142.129.98/api/seller-listings/sorted-by-price/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        console.log("masukk sortet");
        const sortedListings = await response.json();
        console.log(sortedListings);
        setListings(sortedListings);
      } else {
        console.error('Gagal mengambil listing:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="listing-list">
      <div className="flex justify-center my-8">
        <a href="/sell/CreateListingPage" className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
          Add New Listing
        </a>
      </div>

      <div className="flex justify-center my-8">
        <a href="/sell/OrdersManagementPage" className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
          Orders Management
        </a>
      </div>

      <div className="text-center">
        <button onClick={fetchSortedByName} className="mt-4 mr-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Sort by Name
        </button>
        <button onClick={fetchSortedByPrice} className="mt-4 ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Sort by Price
        </button>
      </div>
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
                    <a
                      href={`/sell/EditListingPage?id=${listing.listingId}`}
                      className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                      Edit
                    </a>
                    <button className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center" onClick={() => deleteListing(listing.listingId)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      Delete
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

export default ListingList;