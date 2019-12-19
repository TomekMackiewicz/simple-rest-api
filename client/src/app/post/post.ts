import { User } from '../user/model/user';
import { Category } from './category/category';

    export interface Post {
    id: number;
    title: string;
    slug: string;
    body: string;
    author: User
    categories: Category[]
    dateCreated: Date;
    dateEdited: Date
}

export interface Posts {
    posts: Post[];
    count: number;
}
