import React, { useEffect, useState } from 'react';
import EditListingForm, { EditedListingData } from '@/components/sell/EditListingForm'; // Sesuaikan dengan path yang benar
import { useRouter } from 'next/router';

const EditListingPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [listing, setListing] = useState<EditedListingData | null>(null);

  useEffect(() => {
    const fetchListingById = async (id: string | string[]) => {
      try {
        const response = await fetch(`http://34.142.129.98/api/listing/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch listing');
        }
        const data = await response.json();
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    const { id } = router.query;
    if (id) {
      fetchListingById(id);
    }
  }, [router.query]);


  const handleFormSubmit = async (editedListing: EditedListingData) => {
    try {
      const response = await fetch('http://34.142.129.98/api/listing', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedListing),
      });
      if (response.ok) {
        router.push('/catalogue');
      } else {
        console.error('Failed to edit listing');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-center my-8">
      {listing && <EditListingForm listing={listing} onSubmit={handleFormSubmit} error={error}/>}
      </div>
    </div>
  );
};

export default EditListingPage;