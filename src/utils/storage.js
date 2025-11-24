const STORAGE_KEY = 'user';

export function getStoredUser() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Error reading user data from storage:', error);
        return null;
    }
}

export function setStoredUser(userData) {
    try {
        if (userData) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    } catch (error) {
        console.error('Error writing user data to storage:', error);
    }
}

export function clearStoredUser() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing user data from storage:', error);
    }
}