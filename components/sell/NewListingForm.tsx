import React, { useEffect, useState } from 'react';

interface NewListingFormProps {
  onSubmit: (newListing: NewListingData) => void;
  userId: number;
}

export interface NewListingData {
  listingId: string;
  userId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  rateCondition: number;
  photoUrl: string;
}

const NewListingForm: React.FC<NewListingFormProps> = ({ onSubmit, userId }) => {
  const [error, setError] = useState<string>('');
  
  const [formData, setFormData] = useState<NewListingData>({
    listingId: '',
    userId: userId,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    rateCondition: 0,
    photoUrl: '',
  });

  useEffect(() => {
    if (userId) { // Ensure id is not undefined
      setFormData(formData => ({ ...formData, userId: userId }));
    }
  }, [userId]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://34.142.129.98/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        window.location.href = '/catalogue';
      } else {
        setError('Price or stock must be non-negative atau rate condition harus berada di antara 0,1,2,3');
        console.error('Price or stock must be non-negative atau rate condition harus berada di antara 0,1,2,3');
      }
    } catch (error) {
      setError('Error submitting form:');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stock"
            type="number"
            placeholder="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rateCondition">
            Rate Condition
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rateCondition"
            type="number"
            placeholder="Rate Condition"
            name="rateCondition"
            value={formData.rateCondition}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photoUrl">
            Photo URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="photoUrl"
            type="text"
            placeholder="Photo URL"
            name="photoUrl"
            value={formData.photoUrl} // Ubah menjadi formData.photoUrl
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Listing
          </button>
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </form>
    </div>
  );
};

export default NewListingForm;
