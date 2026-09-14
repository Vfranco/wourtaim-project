import type { IStorage } from "@/domain/interfaces/IStorage";

export class LocalStoragePersistence implements IStorage {
    get(key: string): string | null {
        return localStorage.getItem(key);
    }

    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
}