import React from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/router';

const LOGIN_URL = 'http://34.87.10.122/login';
const PROFILE_URL = 'http://34.87.10.122/profile';
const API_BASE_URL = 'http://34.142.129.98/cartlisting/'||'http://localhost:8080/cartlisting';
const CartPage: React.FC = () => {
    const router = useRouter();
}

export default CartPage