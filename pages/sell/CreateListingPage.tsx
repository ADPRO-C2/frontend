import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import NewListingForm, { NewListingData } from '@/components/sell/NewListingForm';
import { useRouter } from 'next/router';

const PROFILE_URL = 'http://34.87.10.122/profile';

const CreateListingPage: React.FC = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        // const profileResponse = await fetch(PROFILE_URL);
        // const { userId } = await profileResponse.json();
        setUserId(1);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleFormSubmit = async (newListing: NewListingData) => {
    try {
      const response = await fetch('http://localhost:8080/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newListing, userId: userId }),
      });

      if (response.ok) {
        router.push('/sell/CataloguePage');
      } else {
        console.error('Failed to add new listing');
      }
    } catch (error) {
      console.error('Error adding new listing:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center my-8">
        {userId !== undefined && (
          <NewListingForm onSubmit={handleFormSubmit} userId={userId} />
        )}
      </div>
    </div>
  );
};

export default CreateListingPage;
