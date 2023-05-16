import { Entity } from './entity';

export class User extends Entity {
    username: String;
    password: String;
    name: String;
    lastname: String;
    email: String;
    profiles: any;
}
