export class User {
    id: number;
    username: string = '';
    email: string = '';
    password: string = '';
    roles: Array<string> = [];
    enabled: boolean;
}

export class UserRegistration {
    username: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
}

export interface Users {
    users: User[];
    count: number;
}
