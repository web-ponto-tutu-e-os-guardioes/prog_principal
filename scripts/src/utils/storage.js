export function saveRegisterLocalStorage(register) {
    const registers = getRegisterLocalStorage();
    registers.push(register);
    localStorage.setItem("register", JSON.stringify(registers));
}

export function getRegisterLocalStorage() {
    const registers = localStorage.getItem("register");
    return registers ? JSON.parse(registers) : [];
}