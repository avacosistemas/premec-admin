import { Observable } from 'rxjs';
import { Entity } from '../../model/entity';


export interface CRUD<E extends Entity> {
    findAll (filterEntity, fieldsDef, filterInMemory, page: {page: number, pageSize: number}): Observable<E[]>;
    getById(id: number): Observable<E>;
    /** PUT: update the entity on the server */
    update (entity: E): Observable<any>;
    /** POST: add a new entity to the server */
    add (entity: E): Observable<E>;
    /** DELETE: delete the entity from the server */
    delete (entity: E | number): Observable<E>;
    /** DELETE: delete entities*/
    deleteAll (entities: E[]): Observable<E>;
    /** DELETE: delete entities*/
    deleteAllTernario (entities: E[], columnDefSingleId: String, columnDefMultiId: String): Observable<E>;
    /* GET Entity whose name contains search term */
    search(term: string): Observable<E[]>;
}
