import { getRegisterLocalStorage } from "./storage.js";

export function generateUniqueId() {
    const registers = getRegisterLocalStorage() || [];
    const lastId = registers.length ? Math.max(...registers.map(reg => reg.id)) : 0;
    return lastId + 1;
}