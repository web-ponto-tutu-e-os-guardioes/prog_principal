export function getRegisters() {
    return JSON.parse(localStorage.getItem('register')) || [];
}

export function updateRegisters(registers) {
    localStorage.setItem('register', JSON.stringify(registers));
}
