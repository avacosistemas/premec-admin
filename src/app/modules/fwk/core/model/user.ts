import { Entity } from './entity';

export class User extends Entity {
    token: string;
    username: string;
    password: string;
    name: string;
    lastname: string;
    email: string;
    profiles: any;
}