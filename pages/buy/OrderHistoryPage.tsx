import React, {useState} from 'react';
import Header from '@/components/Header';
import UserOrderHistory, { Order } from '@/components/buy/UserOrderHistory';
import { useRouter } from 'next/router';
import {GetServerSideProps} from "next";
import {Listing} from "@/components/sell/ListingList";

const API_BASE_URL = `http://34.142.129.98/order/user/`;

interface OrderHistoryPageProps {
    orders: Order[],
    userId: number
}
const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({ orders: initialOrders, userId }) => {
    const router = useRouter();
    const [orders, setCart] = useState<Order[]>(initialOrders);

    return (
        <div>
            <Header />
            <UserOrderHistory orders={orders} userId={1}/>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<OrderHistoryPageProps> = async (context) => {
    try {
        const userId = context.params?.userId ? parseInt(context.params.userId as string, 10) : 2;

        const apiUrl = `${API_BASE_URL}${1}`;
        const response = await fetch(apiUrl);
        const orders: Order[] = await response.json();

        return {
            props: {
                orders,
                userId: userId,
            },
        };
    } catch (error) {
        const userId = context.params?.userId ? parseInt(context.params.userId as string, 10) : 2;
        console.error('Error fetching data:', error);
        return {
            props: {
                orders: [],
                userId: userId,
            },
        };
    }
};

export default OrderHistoryPage