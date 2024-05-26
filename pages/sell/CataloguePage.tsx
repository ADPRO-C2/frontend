// import React, { useState, useEffect } from 'react';
// import Header from '@/components/Header';
// import ListingList, { Listing } from '@/components/sell/ListingList';
// import { GetServerSideProps } from 'next';
// import { useGetProfileQuery } from '@/redux/features/authApiSlice';

// interface CataloguePageProps {
//   listings: Listing[];
// }

// const CataloguePage: React.FC<CataloguePageProps> = ({ listings: initialListings}) => {
//   const [listings, setListings] = useState<Listing[]>(initialListings);
//   return (
//     <div>
//       <Header />
//       <ListingList listings={listings} userId={2} />
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps<CataloguePageProps> = async () => {
  
//   try {
//     const apiUrl = `http://34.142.129.98/api/seller-listings/${2}`;
//     const response = await fetch(apiUrl);
//     const listings: Listing[] = await response.json();
//     return {
//       props: {
//         listings,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return {
//       props: {
//         listings: [],
        
//       },
//     };
//   }
// };

// export default CataloguePage;