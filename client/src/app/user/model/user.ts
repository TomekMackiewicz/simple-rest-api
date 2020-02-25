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
    first: string = '';
    confirmPassword: string = '';
}

export interface Users {
    users: User[];
    count: number;
}

interface userRoles {
    value: string;
    label: string;
}

export const USER_ROLES: userRoles[] = [
    {value: 'ROLE_USER', label: 'User'},
    {value: 'ROLE_ADMIN', label: 'Admin'},
    {value: 'ROLE_SUPER_ADMIN', label: 'Super admin'}
];