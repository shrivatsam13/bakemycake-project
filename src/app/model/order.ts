// Model for Order Details
export type Order = {
    id?: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    itemName: string;
    itemCategory:string;
    itemPrice:number;
    totalOrderPrice:number
    quantity: number;
    deliveryDate: Date;
};