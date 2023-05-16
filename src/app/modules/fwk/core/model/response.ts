import { Entity } from './entity';

export class Response<E> extends Entity {
    status: any;
    error: any;
    data: E;
}
