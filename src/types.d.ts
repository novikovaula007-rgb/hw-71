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