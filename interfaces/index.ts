// interfaces/index.ts
export interface TopUp {
    id: string;
    userId: number;
    amount: number;
    status: string;
    paymentMethodId: string;
}

export interface PaymentMethod {
    paymentId: string;
    userId: number;
    paymentType: string;
    paymentDetails: {
        cardNumber?: string;
        cvc?: string;
        expiryDate?: string;
        phoneNumber?: string;
    };
}

export interface TopUpRequest {
    userId: number;
    amount: number;
    paymentMethodId: string;
}

export interface PaymentMethodRequest {
    userId: number;
    paymentType: string;
    cardNumber?: string;
    cvc?: string;
    expiryDate?: string;
    phoneNumber?: string;
}
