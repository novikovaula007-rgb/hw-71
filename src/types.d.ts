export interface IDish {
    id: string,
    title: string,
    price: number,
    image: string
}

export interface IDishMutation {
    title: string,
    price: number,
    image: string
}

export interface IDishAPI {
    [key: string]: IDishMutation
}

export interface CartDish {
    dish: IDish,
    count: number,
}

export type IOrder = Record<string, number>;

export interface IOrderAPI {
    [key: string]: IOrder
}

export interface IOrderData {
    id: string;
    items: IOrder;
}

