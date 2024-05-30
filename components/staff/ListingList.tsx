import React, { useState } from 'react';
import '@/styles/globals.css';

export interface Listing {
  description: string;
  listingId: string;
  id: string;
  name: string;
  photoUrl: string;
  price: number;
  rateCondition: number;
  stock: number;
  userId: number;
}

export default Listing;