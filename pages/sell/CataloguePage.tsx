// pages/catalogue.tsx

import React, { useState } from 'react';
import Header from '@/components/Header';
import ListingList, { Listing } from '@/components/sell/ListingList';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

const API_URL = 'http://localhost:8080/api/listings'; // Ganti dengan URL API Anda

interface CataloguePageProps {
  listings: Listing[];
}

const CataloguePage: React.FC<CataloguePageProps> = ({ listings: initialListings }) => {
  const [listings, setListings] = useState<Listing[]>(initialListings); // Inisialisasi state listings dengan nilai awal dari props

  return (
    <div>
      <Header />
      <div className="flex justify-center my-8">
        <a href="http://localhost:3000/sell/CreateListingPage" className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
          Add New Listing
        </a>
      </div>
      <ListingList listings={listings} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<CataloguePageProps> = async () => {
  try {
    const response = await fetch(API_URL);
    const listings: Listing[] = await response.json();
    return {
      props: {
        listings,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        listings: [],
      },
    };
  }
};

export default CataloguePage;
