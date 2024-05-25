import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ListingList, { Listing } from '@/components/sell/ListingList';
import { GetServerSideProps } from 'next';

const LOGIN_URL = 'http://34.87.10.122/login';
const PROFILE_URL = 'http://34.87.10.122/profile';
const API_BASE_URL = 'http://34.142.129.98/api/seller-listings/';

interface CataloguePageProps {
  listings: Listing[];
}

const CataloguePage: React.FC<CataloguePageProps> = ({ listings: initialListings }) => {
  const [listings, setListings] = useState<Listing[]>(initialListings);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Mendapatkan token JWT palsu dengan login palsu
        const loginResponse = await fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: 'rio', password: 'test1234' }),
        });
        const { token } = await loginResponse.json();

        console.log(token)

        const profileResponse = await fetch(PROFILE_URL, {
          method: 'GET',
          credentials: 'include', // Sertakan cookie dalam permintaan
        });

        const profileData = await profileResponse.json();
        const userId = profileData.id;

        console.log(userId)

        // Memanggil endpoint API dengan userId
        const apiUrl = `${API_BASE_URL}${userId}`;
        const response = await fetch(apiUrl);
        const listingsData: Listing[] = await response.json();
        setListings(listingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchListings();
  }, []);

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
    // Tidak diperlukan karena data didapatkan secara dinamis di client side
    return {
      props: {
        listings: [],
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
