export class User {
    id: number;
    username: string = '';
    email: string = '';
    password: string = '';
    roles: Array<string> = []
}

export class UserRegistration {
    username: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
}
