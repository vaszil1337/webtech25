import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AnimalCard from "../components/AnimalCard.jsx";
import { useAnimalsData } from "../contexts/Animals.jsx";
import Filters from "../components/Filters.jsx";

export default function AppPage() {
  const [filterValues, setFilterValues] = useState({
    searchTerm: "",
    species: "all",
    gender: "all",
  });
  const [filtersVisible, setFiltersVisible] = useState(false);
  const navigate = useNavigate();
  const { animals } = useAnimalsData();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const filterOptions = useMemo(() => {
    const unique = (arr) => [...new Set(arr.filter(Boolean))];
    return [
      {
        key: "species",
        label: "Faj",
        options: unique(animals.map((a) => a.species)),
      },
      {
        key: "gender",
        label: "Nem",
        options: unique(animals.map((a) => a.gender)),
      },
    ];
  }, [animals]);

  const filteredAnimals = animals.filter((a) => {
    const matchName = a.name
      .toLowerCase()
      .includes(filterValues.searchTerm.toLowerCase());
    const matchSpecies =
      filterValues.species === "all" || a.species === filterValues.species;
    const matchGender =
      filterValues.gender === "all" || a.gender === filterValues.gender;
    return matchName && matchSpecies && matchGender;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-300 py-12">
      <div className="max-w-6xl mx-auto w-full px-6">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">PetBase</h1>
            <p className="text-sm text-base-content/70 mt-1">Állatok kezelése</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="btn bg-petbase-blue btn-md px-5 py-2 shadow-lg hover:shadow-2xl transition-shadow"
              onClick={() => navigate("/app/add")}
            >
              + Új állat
            </button>
          </div>
        </header>

        <div className="p-6 bg-base-100 rounded-2xl shadow-2xl ring-1 ring-inset ring-base-200/50 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-base-content/60">
              Összesen:{" "}
              <span className="font-medium text-base-content">
                {filteredAnimals.length}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                className={`btn btn-sm ${
                  filtersVisible ? "btn-primary" : "btn-ghost"
                }`}
                onClick={() => setFiltersVisible((v) => !v)}
              >
                {filtersVisible ? "Szűrők elrejtése" : "Szűrők megjelenítése"}
              </button>
            </div>
          </div>

          {filtersVisible && (
            <div className="mb-6 transition-all">
              <Filters
                filters={filterOptions}
                onFilterChange={setFilterValues}
              />
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
