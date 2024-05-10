// interfaces/index.ts
export interface TopUp {
    id: string;
    amount: number;
    status: string;
}

export interface PaymentMethod {
    paymentId: string;
    paymentType: string;
    paymentDetails: {
        cardNumber?: string;
        phoneNumber?: string;
    };
}

export interface TopUpRequest {
    userId: string;
    amount: number;
    paymentMethodId: string;
}

export interface PaymentMethodRequest {
    paymentType: string;
    cardNumber?: string;
    cvc?: string;
    expiryDate?: string;
    phoneNumber?: string;
}
