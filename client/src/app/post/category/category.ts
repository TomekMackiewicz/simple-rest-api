export interface Category {
    id: number;
    name: string;
    dateCreated: Date;
    dateEdited: Date
}

export interface Categories {
    categories: Category[];
    count: number;
}
