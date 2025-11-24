import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getStoredAnimals, setStoredAnimals, clearStoredAnimals } from "../utils/animals";

export const AnimalsDataContext = createContext(null);

const defaultAnimals = [
    { id: 1, name: "Bodri", species: "kutya", breed: "keverék", gender: "kan", birthDate: "2017-02-21", ownerName: "Kovács János", ownerPhone: "06301234567", lastVaccinationDate: "2023-06-15", nextVaccinationDate: "2024-06-15", notes: "Nincs különleges megjegyzés." },
    { id: 2, name: "Cirmi", species: "macska", breed: "perzsa", gender: "nőstény", birthDate: "2018-03-17", ownerName: "Nagy Éva", ownerPhone: "06307654321", lastVaccinationDate: "2023-09-20", nextVaccinationDate: "2023-09-20", notes: "Allergiás bizonyos ételekre." },
    { id: 3, name: "Cirmi", species: "macska", breed: "perzsa", gender: "nőstény", birthDate: "2018-03-17", ownerName: "Nagy Éva", ownerPhone: "06307654321", lastVaccinationDate: "2023-09-20", nextVaccinationDate: "2024-09-20", notes: "Allergiás bizonyos ételekre." },
    { id: 4, name: "Cirmi", species: "macska", breed: "perzsa", gender: "nőstény", birthDate: "2018-03-17", ownerName: "Nagy Éva", ownerPhone: "06307654321", lastVaccinationDate: "2023-09-20", nextVaccinationDate: "2024-09-20", notes: "Allergiás bizonyos ételekre." },
    { id: 5, name: "Cirmi", species: "macska", breed: "perzsa", gender: "nőstény", birthDate: "2018-03-17", ownerName: "Nagy Éva", ownerPhone: "06307654321", lastVaccinationDate: "2023-09-20", nextVaccinationDate: "2024-09-20", notes: "Allergiás bizonyos ételekre." },
    { id: 6, name: "Cirmi", species: "macska", breed: "perzsa", gender: "nőstény", birthDate: "2018-03-17", ownerName: "Nagy Éva", ownerPhone: "06307654321", lastVaccinationDate: "2023-09-20", nextVaccinationDate: "2024-09-20", notes: "Allergiás bizonyos ételekre." },
    { id: 7, name: "Cirmi", species: "macska", breed: "perzsa", gender: "nőstény", birthDate: "2018-03-17", ownerName: "Nagy Éva", ownerPhone: "06307654321", lastVaccinationDate: "2023-09-20", nextVaccinationDate: "2024-09-20", notes: "Allergiás bizonyos ételekre." },
    { id: 8, name: "Cirmi", species: "macska", breed: "perzsa", gender: "nőstény", birthDate: "2018-03-17", ownerName: "Nagy Éva", ownerPhone: "06307654321", lastVaccinationDate: "2023-09-20", nextVaccinationDate: "2024-09-20", notes: "Allergiás bizonyos ételekre." },
    { id: 9, name: "Cirmi", species: "macska", breed: "perzsa", gender: "nőstény", birthDate: "2018-03-17", ownerName: "Nagy Éva", ownerPhone: "06307654321", lastVaccinationDate: "2023-09-20", nextVaccinationDate: "2024-09-20", notes: "Allergiás bizonyos ételekre." },
    { id: 10, name: "Cirmi", species: "macska", breed: "perzsa", gender: "nőstény", birthDate: "2018-03-17", ownerName: "Nagy Éva", ownerPhone: "06307654321", lastVaccinationDate: "2023-09-20", nextVaccinationDate: "2024-09-20", notes: "Allergiás bizonyos ételekre." },
    { id: 11, name: "Cirmi", species: "macska", breed: "perzsa", gender: "nőstény", birthDate: "2018-03-17", ownerName: "Nagy Éva", ownerPhone: "06307654321", lastVaccinationDate: "2023-09-20", nextVaccinationDate: "2024-09-20", notes: "Allergiás bizonyos ételekre." },
    { id: 12, name: "Cirmi", species: "macska", breed: "perzsa", gender: "nőstény", birthDate: "2018-03-17", ownerName: "Nagy Éva", ownerPhone: "06307654321", lastVaccinationDate: "2023-09-20", nextVaccinationDate: "2024-09-20", notes: "Allergiás bizonyos ételekre." },
    { id: 13, name: "Cirmi", species: "macska", breed: "perzsa", gender: "nőstény", birthDate: "2018-03-17", ownerName: "Nagy Éva", ownerPhone: "06307654321", lastVaccinationDate: "2023-09-20", nextVaccinationDate: "2024-09-20", notes: "Allergiás bizonyos ételekre." },
    { id: 14, name: "Cirmi", species: "macska", breed: "perzsa", gender: "nőstény", birthDate: "2018-03-17", ownerName: "Nagy Éva", ownerPhone: "06307654321", lastVaccinationDate: "2023-09-20", nextVaccinationDate: "2024-09-20", notes: "Allergiás bizonyos ételekre." },


];

export function AnimalsDataProvider({ children, initial = null }) {
    const [animals, setAnimals] = useState(() => {
        const stored = getStoredAnimals();
        return stored ?? (initial ?? defaultAnimals);
    });

    useEffect(() => {
        setStoredAnimals(animals);
    }, [animals]);

    const addAnimal = (animal) => {
        const id = (findMaxId() + 1);
        setAnimals(current => [...current, { ...animal, id }]);
    };

    const updateAnimal = (updatedAnimal) => {
        setAnimals(current => current.map(a => a.id === updatedAnimal.id ? updatedAnimal : a));
    };

    const deleteAnimal = (id) => {
        setAnimals(current => current.filter(a => a.id !== id));
    };

    const findMaxId = () => {
        return animals.reduce((max, a) => (a.id > max ? a.id : max), 0);
    };

    const value = { animals, addAnimal, updateAnimal, deleteAnimal, setAnimals };

    return (
        <AnimalsDataContext.Provider value={value}>
            {children}
        </AnimalsDataContext.Provider>
    );
}

export function useAnimalsData() {
    const context = useContext(AnimalsDataContext);
    if (context === null) {
        throw new Error("useAnimalsData must be used within an AnimalsDataProvider");
    }
    return context; // { animals, addAnimal, updateAnimal, deleteAnimal }
}