import type { IRepository } from "@/domain/interfaces/IRepository";
import type { IStorage } from "@/domain/interfaces/IStorage";

export class PersistenceRepository<T extends { id: string }> implements IRepository<T> {
    constructor(private readonly storageKey: string, private readonly storage: IStorage) { }

    private readStorage(): T[] {
        const data = this.storage.get(this.storageKey);
        if (!data) return [];

        try {
            const parsedData: unknown = JSON.parse(data);
            if (!Array.isArray(parsedData)) {
                console.error(`Data in "${this.storageKey}" is not an array:`, parsedData);
                return [];
            }
            const filteredData = parsedData.filter(
                (item) => typeof item === "object" && item !== null && "id" in item && typeof (item as { id: unknown }).id === "string"
            );
            return filteredData;
        } catch (error) {
            console.error(`Error parsing local storage data for key ${this.storageKey}:`, error);
            return [];
        }
    }

    private writeStorage(data: T[]): void {
        this.storage.set(this.storageKey, JSON.stringify(data));
    }

    create(payload: T): boolean {
        try {
            const data = this.readStorage();
            data.push(payload);
            this.writeStorage(data);
            return true;
        } catch (error) {
            throw new Error(`Failed to create item: ${(error as Error).message}`);
        }
    }

    read(): T[] {
        return this.readStorage();
    }

    update(id: string, payload: T): boolean {
        try {
            const data = this.readStorage();
            const validId = data.some((item) => item.id === id);
            if (!validId) return false;
            const updatedData = data.map((item) => (item.id === id ? payload : item));
            this.writeStorage(updatedData);
            return true;
        } catch (error) {
            throw new Error(`Failed to update item with id ${id}: ${(error as Error).message}`);
        }
    }

    delete(id: string): boolean {
        try {
            const data = this.readStorage();
            const updatedData = data.filter((item) => item.id !== id);
            if (updatedData.length === data.length) return false;
            this.writeStorage(updatedData);
            return true;
        } catch (error) {
            throw new Error(`Failed to remove item with id ${id}: ${(error as Error).message}`);
        }
    }
}
