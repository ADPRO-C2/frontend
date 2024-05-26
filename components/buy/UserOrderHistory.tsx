import React, { useState, useEffect } from 'react';
import '@/styles/globals.css';
import { useRouter } from 'next/router';

const LOGIN_URL = 'http://34.87.10.122/login';
const PROFILE_URL = 'http://34.87.10.122/profile';

export interface Order {
    orderId: string;
    sellerId: number;
    userId: number;
    status: OrderStatus;
    listingName: string;
    photoUrl: string;
    amount: number;
    totalPrice: number;
    dateBought: Date;
}

enum OrderStatus {
    DIKEMAS = 'dikemas',
    DI_JALAN = 'di_jalan',
    SUDAH_SAMPAI = 'sudah_sampai'
}

interface UserOrderHistoryProps {
    orders: Order[];
    userId: number;
}

const UserOrderHistory: React.FC<UserOrderHistoryProps> = ({ orders , userId}) => {

    const [currentHistory, setOrders] = useState<Order[]>(orders);

    return (
        <div className="listing-list">
            <div className="grid grid-cols-5 gap-4">
                {orders.map(order => (
                    <div className="listing-card" key={order.orderId}>
                        <div className="max-w-sm rounded overflow-hidden shadow-lg">
                            <img className="w-full" src={order.photoUrl} alt={order.listingName} />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{order.listingName}</div>
                                <div className="listing-details">
                                    <p>Total Price: IDR {order.totalPrice}</p>
                                    <p>Date Bought: {order.dateBought.toString()}</p>
                                    <p>Status: {order.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserOrderHistory;