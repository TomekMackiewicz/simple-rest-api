export interface Post {
    id: number;
    title: string;
    slug: string;
    body: string;
    // category
    // author
    // date created
    // date editedS
}

export interface Posts {
    posts: Post[];
    count: number;
}
