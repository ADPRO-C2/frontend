// interfaces/index.ts
export interface TopUp {
    id: string;
    userId: string;
    amount: number;
    status: string;
    paymentMethodId: string;
}

export interface PaymentMethod {
    paymentId: string;
    userId: string;
    paymentType: string;
    paymentDetails: {
        cardNumber?: string;
        cvc?: string;
        expiryDate?: string;
        phoneNumber?: string;
    };
}

export interface TopUpRequest {
    userId: string;
    amount: number;
    paymentMethodId: string;
}

export interface PaymentMethodRequest {
    userId: string;
    paymentType: string;
    cardNumber?: string;
    cvc?: string;
    expiryDate?: string;
    phoneNumber?: string;
}
