// pages/create-listing.tsx

import React from 'react';
import Header from '@/components/Header';
import NewListingForm, { NewListingData } from '@/components/sell/NewListingForm'; // Sesuaikan dengan path yang benar
import '@/styles/globals.css';
import { useRouter } from 'next/router';

const CreateListingPage: React.FC = () => {
  const router = useRouter();

  const handleFormSubmit = async (newListing: NewListingData) => {
    try {
      // Kirim data listing baru ke backend
      const response = await fetch('http://localhost:8080/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newListing),
      });

      if (response.ok) {
        // Jika respons sukses, kembalikan pengguna ke halaman sebelumnya (mungkin kembali ke halaman katalog)
        router.back();
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
        <NewListingForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default CreateListingPage;
