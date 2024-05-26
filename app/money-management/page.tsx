"use client";

import React, { useState, useEffect } from 'react';
import PaymentMethodList from '@/components/PaymentMethodList';
import TopUpList from '@/components/TopUpList';
import PaymentMethodForm from '@/components/PaymentMethodForm';
import TopUpForm from '@/components/TopUpForm';
import CustomModal from '@/components/CustomModal';
import { useGetProfileQuery } from '@/redux/features/authApiSlice';
import '@/styles/topupPayment.css';
import { getAllPaymentMethodsByUserId } from '@/services/paymentService';
import { getAllTopUpsByUserId } from '@/services/topUpService';

export default function Page() {
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [isTopUpModalOpen, setTopUpModalOpen] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [topUps, setTopUps] = useState([]);
    const [currentBalance, setCurrentBalance] = useState(0);

    const { data: user, isLoading: isUserLoading } = useGetProfileQuery();

    useEffect(() => {
        if (user && user.id) {
            fetchAllData(user.id);
        }
        if (user && user.balance) {
            setCurrentBalance(user.balance); // Setting balance directly from user profile data
        }
    }, [user?.id, user?.balance]);

    const fetchAllData = async (userId: number) => {
        await Promise.all([
            fetchPaymentMethods(userId),
            fetchTopUps(userId)
        ]);
    };

    const fetchPaymentMethods = async (userId: number) => {
        const methods = await getAllPaymentMethodsByUserId(userId);
        setPaymentMethods(methods);
    };

    const fetchTopUps = async (userId: number) => {
        const topUps = await getAllTopUpsByUserId(userId);
        setTopUps(topUps);
    };

    return (
        <div>
            <div className="container mx-auto my-8 ">
                <h1 className="text-3xl font-bold mb-4">Money Management</h1>
                <div className="balance-display">
                    <h2 className="text-2xl font-bold dark-blue-text">Your Current Balance: Rp {currentBalance.toFixed(2)}</h2>        
                </div>
                <div className="flex justify-between mb-6">
                    <button className="button-secondary" onClick={() => setTopUpModalOpen(true)}>Add Top-Up</button>
                    <button className="button-secondary" onClick={() => setPaymentModalOpen(true)}>Add Payment Method</button>
                </div>
                <div className="flex flex-wrap gap-8">
                    <div className="flex-1 min-w-[40%] card">
                        <TopUpList topUps={topUps} refreshData={() => user?.id ? fetchTopUps(user.id) : Promise.resolve()} />
                    </div>
                    <div className="flex-1 min-w-[40%] card">
                        <PaymentMethodList paymentMethods={paymentMethods} refreshData={() => user?.id ? fetchPaymentMethods(user.id) : Promise.resolve()} />
                    </div>
                </div>
                <CustomModal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)} title="Add Payment Method">
                    {user && <PaymentMethodForm user={user} refreshPaymentMethods={() => user?.id ? fetchPaymentMethods(user.id) : Promise.resolve()} />}
                </CustomModal>
                <CustomModal isOpen={isTopUpModalOpen} onClose={() => setTopUpModalOpen(false)} title="Add Top-Up">
                    {user && <TopUpForm user={user} refreshTopUps={() => user?.id ? fetchTopUps(user.id) : Promise.resolve()} />}
                </CustomModal>
            </div>
        </div>
    );
}
