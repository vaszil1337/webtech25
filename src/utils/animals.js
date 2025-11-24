const STORAGE_KEY = 'animals';

export function getStoredAnimals() {
    try {
        if (typeof window === 'undefined') return null;
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Error reading animal data from storage:', error);
        return null;
    }
}

export function setStoredAnimals(animalsData) {
    try {
        if (typeof window === 'undefined') return;
        if (animalsData) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(animalsData));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    } catch (error) {
        console.error('Error writing animal data to storage:', error);
    }
}

export function clearStoredAnimals() {
    try {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing animal data from storage:', error);
    }
}