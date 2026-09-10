export interface IRepository<T> {
    create(payload: T): boolean;
    remove(id: string): boolean;
    update(id: string, payload: T): boolean;
    readAll(): T[];
    getById(id: string): T | null;
}