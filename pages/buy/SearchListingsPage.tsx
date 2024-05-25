import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ListingList, { Listing } from '@/components/sell/ListingList';
import { GetServerSideProps } from 'next';
import AllListingList from "@/components/buy/AllListingList";

const LOGIN_URL = 'http://34.87.10.122/login';
const PROFILE_URL = 'http://34.87.10.122/profile';
const API_BASE_URL = 'http://34.142.129.98/api/listings/'||'http://localhost:8080/api/listings';

interface SearchListingsPageProps {
    listings: Listing[];
}

const SearchListingsPage: React.FC<SearchListingsPageProps> = ({ listings: allListings }) => {
    const [listings, setListings] = useState<Listing[]>(allListings);

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
                const apiUrl = `${API_BASE_URL}`;
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
            </div>
            <AllListingList listings={listings} />
        </div>
    );
};


export const getServerSideProps: GetServerSideProps<SearchListingsPageProps> = async () => {
    try {
        const apiUrl = API_BASE_URL;
        const response = await fetch(apiUrl);
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

export default SearchListingsPage;