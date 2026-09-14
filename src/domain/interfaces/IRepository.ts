export interface IRepository<T> {
    create(payload: T): boolean;
    read(): T[];
    update(id: string, payload: T): boolean;
    delete(id: string): boolean;
}