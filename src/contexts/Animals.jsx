import { createContext, useContext, useState, useEffect } from "react";
import { getStoredAnimals, setStoredAnimals } from "../utils/animals";

export const AnimalsDataContext = createContext(null);

const defaultAnimals = [
    { id: 1, name: "Bodri", species: "kutya", breed: "keverék", gender: "kan", birthDate: "2017-02-21", ownerName: "Kovács János", ownerPhone: "06301234567", lastVaccinationDate: "2023-06-15", nextVaccinationDate: "2024-06-15", notes: "Nincs különleges megjegyzés." },
    { id: 2, name: "Cirmi", species: "macska", breed: "perzsa", gender: "nőstény", birthDate: "2018-03-17", ownerName: "Nagy Éva", ownerPhone: "06307654321", lastVaccinationDate: "2023-09-20", nextVaccinationDate: "2024-09-20", notes: "Allergiás bizonyos ételekre." },
    { id: 3, name: "Tappancs", species: "kutya", breed: "labrador", gender: "kan", birthDate: "2019-11-05", ownerName: "Szabó Péter", ownerPhone: "06309876543", lastVaccinationDate: "2024-01-10", nextVaccinationDate: "2025-01-10", notes: "Szereti a hosszú sétákat." },
    { id: 4, name: "Mici", species: "macska", breed: "siámi", gender: "nőstény", birthDate: "2020-06-30", ownerName: "Kiss Anna", ownerPhone: "06303456789", lastVaccinationDate: "2023-12-05", nextVaccinationDate: "2024-12-05", notes: "Szereti a magas helyeket." },
    { id: 5, name: "Rex", species: "kutya", breed: "német juhász", gender: "kan", birthDate: "2016-08-15", ownerName: "Németh László", ownerPhone: "06305551234", lastVaccinationDate: "2023-11-10", nextVaccinationDate: "2024-11-10", notes: "Nagyon energikus." },
    { id: 6, name: "Szofi", species: "macska", breed: "brit rövidszőrű", gender: "nőstény", birthDate: "2019-04-22", ownerName: "Farkas Zoltán", ownerPhone: "06302223344", lastVaccinationDate: "2023-08-18", nextVaccinationDate: "2024-08-18", notes: "Szereti a játékokat."},
    { id: 7, name: "Leo", species: "kutya", breed: "beagle", gender: "kan", birthDate: "2021-01-10", ownerName: "Varga Mária", ownerPhone: "06306667777", lastVaccinationDate: "2024-03-12", nextVaccinationDate: "2025-03-12", notes: "Szereti a vizet." }

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