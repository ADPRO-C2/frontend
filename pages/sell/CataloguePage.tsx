import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ListingList, { Listing } from '@/components/sell/ListingList';
import { GetServerSideProps } from 'next';

const LOGIN_URL = 'http://34.87.10.122/login';
const PROFILE_URL = 'http://34.87.10.122/profile';
const API_BASE_URL = 'http://34.142.129.98/api/seller-listings/';

interface CataloguePageProps {
  listings: Listing[];
  userId: number;
}

const CataloguePage: React.FC<CataloguePageProps> = ({ listings: initialListings, userId }) => {
  const [listings, setListings] = useState<Listing[]>(initialListings);

  // useEffect(() => {
  //   const fetchListings = async () => {
  //     try {
  //       // // Mendapatkan token JWT palsu dengan login palsu
  //       // const loginResponse = await fetch(LOGIN_URL, {
  //       //   method: 'POST',
  //       //   headers: {
  //       //     'Content-Type': 'application/json',
  //       //   },
  //       //   body: JSON.stringify({ username: 'rio', password: 'test1234' }),
  //       // });
  //       // const { token } = await loginResponse.json();

  //       // console.log(token)

  //       // const profileResponse = await fetch(PROFILE_URL, {
  //       //   method: 'GET',
  //       //   credentials: 'include', // Sertakan cookie dalam permintaan
  //       // });

  //       // const profileData = await profileResponse.json();
  //       // const userId = profileData.id;

  //       // console.log(userId)

  //       // Memanggil endpoint API dengan userId
  //       const apiUrl = `${API_BASE_URL}${2}`;
  //       const response = await fetch(apiUrl);
  //       const listingsData: Listing[] = await response.json();

  //       setListings(listingsData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchListings();
  // }, []);

  return (
    <div>
      <Header />
      <ListingList listings={listings} userId={2}/>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<CataloguePageProps> = async (context) => {
  try {
    const userId = context.params?.userId ? parseInt(context.params.userId as string, 10) : 2;
    const apiUrl = `${API_BASE_URL}${2}`;
    const response = await fetch(apiUrl);
    const listings: Listing[] = await response.json();
    return {
      props: {
        listings,
        userId:userId,
      },
    };
  } catch (error) {
    const userId = context.params?.userId ? parseInt(context.params.userId as string, 10) : 2;
    console.error('Error fetching data:', error);
    return {
      props: {
        listings: [],
        userId:userId,
      },
    };
  }
};


export default CataloguePage;
