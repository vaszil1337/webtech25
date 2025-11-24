import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimalsData } from "../contexts/Animals";

export default function AddAnimalPage() {
  const navigate = useNavigate();
  const { addAnimal } = useAnimalsData();

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    birthDate: "",
    ownerName: "",
    ownerPhone: "",
    lastVaccinationDate: "",
    nextVaccinationDate: "",
    notes: "",
  });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    addAnimal(formData);
    navigate("/app");
  };

  return (
   <div className="min-h-screen overflow-y-auto bg-base-200 p-6">
      <div className="max-w-4xl w-full mx-auto">
        <button className="btn btn-ghost mb-4" onClick={() => navigate(-1)}>
          ← Vissza
        </button>

        <div className="card shadow-lg p-6 bg-gray-800">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">
                Új állat hozzáadása
            </h2>

            <div className="flex gap-2">
                <button
                  type="submit"
                  form="animal-form"
                  className="btn btn-success"
                >
                  Mentés
                </button>
            </div>
          </div>

            <form
              id="animal-form"
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-3 p-4"
            >
              <input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="input w-full"
                required
                placeholder="Név"
              />
              <input
                name="species"
                value={formData.species || ""}
                onChange={handleChange}
                className="input w-full"
                required
                placeholder="Faj"
              />
              <input
                name="breed"
                value={formData.breed || ""}
                onChange={handleChange}
                className="input w-full"
                required
                placeholder="Fajta"
              />
              <input
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                className="input w-full"
                required
                placeholder="Nem"
              />
              <input
                name="birthDate"
                value={formData.birthDate || ""}
                onChange={handleChange}
                pattern="^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$"
                required
                className="input w-full"
                placeholder="Születési dátum (YYYY-MM-DD)"
              />
              <input
                name="ownerName"
                value={formData.ownerName || ""}
                onChange={handleChange}
                className="input w-full"
                required
                placeholder="Gazdi neve"
              />
              <input
                name="ownerPhone"
                value={formData.ownerPhone || ""}
                onChange={handleChange}
                className="input w-full"
                required
                type="tel"
                pattern="^(\+36|06)\d{9}$"
                placeholder="Telefonszám (+36/06xxxxxxxxx)"
              />
              <input
                name="lastVaccinationDate"
                value={formData.lastVaccinationDate || ""}
                onChange={handleChange}
                pattern="^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$"
                placeholder="Utolsó oltás dátuma (YYYY-MM-DD)"
                required
                className="input w-full"
              />
              <input
                name="nextVaccinationDate"
                value={formData.nextVaccinationDate || ""}
                onChange={handleChange}
                pattern="^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$"
                placeholder="Következő oltás dátuma (YYYY-MM-DD)"
                required
                className="input w-full"
              />
              <textarea
                name="notes"
                value={formData.notes || ""}
                onChange={handleChange}
                className="textarea w-full"
                required
                placeholder="Megjegyzések"
              />
            </form>
        </div>
      </div>
    </div>
  );
}