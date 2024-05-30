import React, { useState } from 'react';
import '@/styles/globals.css';

export interface TopUp {
    id: string;
    userId: number;
    amount: number;
    paymentMethodId: string;
    status: string;
}

interface AllListingListProps {
    topUps: TopUp[];
}

const AllListingList: React.FC<AllListingListProps> = ({ topUps }) => {
    const [currentTopUps, setTopUps] = useState<TopUp[]>(topUps);

    const approve = async (id: string) => {
        try {
            const response = await fetch(`http://35.213.172.32/staff/top-up-transaction/accept/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                console.log("test")
                console.log('TopUp berhasil diapprove');
            } else {
                console.error('Gagal approve TopUp: ', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const reject = async (id: string) => {
        try {
            const response = await fetch(`http://35.213.172.32/staff/top-up-transaction/reject/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                console.log("test")
                console.log('TopUp berhasil direject');
            } else {
                console.error('Gagal reject TopUp: ', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="listing-list">
            <div className="listing-list grid grid-cols-5 gap-4">
                {currentTopUps.map((topUp: TopUp) => (
                    <div className="listing-card" key={topUp.id}>
                        <div className="max-w-sm rounded overflow-hidden shadow-lg">
                            <div className="px-6 py-4">
                                <div className="listing-details">
                                    <p>UserId: {topUp.userId}</p>
                                    <p>Amount: IDR {topUp.amount}</p>
                                    <p>PaymentMethodId: {topUp.paymentMethodId}</p>
                                    <p>Status: {topUp.status}</p>
                                </div>

                                <div className="mt-2">
                                    <div className="inline-flex items-center rounded-md shadow-sm">
                                        <button
                                            className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                                            onClick={() => approve(topUp.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                            </svg>
                                            Approve
                                        </button>
                                        <button
                                            className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                                            onClick={() => reject(topUp.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                            </svg>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllListingList;