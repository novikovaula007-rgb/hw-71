interface IDish {
    id: string,
    title: string,
    price: number,
    image: string
}

interface IDishMutation {
    title: string,
    price: number,
    image: string
}

interface IDishAPI {
    [key: string]: IDishMutation
}