import type { IRepository } from "@/domain/interfaces/IRepository";

export class LocalStorageRepository<T extends { id: string }> implements IRepository<T> {
    constructor(private readonly storageKey: string) {}

    private readStorage(): T[] {
        const data = localStorage.getItem(this.storageKey);
        if (!data) return [];

        try {
            const parsedData: unknown = JSON.parse(data);
            if (!Array.isArray(parsedData)) return [];
            const validItem = parsedData.every(
                (item) =>
                    typeof item === "object" &&
                    item !== null &&
                    "id" in item &&
                    typeof (item as { id: unknown }).id === "string",
            );
            return validItem ? (parsedData as T[]) : [];
        } catch {
            return [];
        }
    }

    private writeStorage(data: T[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
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

    remove(id: string): boolean {
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

    readAll(): T[] {
        return this.readStorage();
    }

    getById(id: string): T | null {
        const data = this.readStorage();
        return data.find((item) => item.id === id) ?? null;
    }
}
