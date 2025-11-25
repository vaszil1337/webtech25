import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAnimalsData } from "../contexts/Animals";
import ConfirmModal from "../components/ConfirmModal";
import { setDelay } from "../utils/delay";
import { useInteraction } from "../contexts/Interaction";

export default function AnimalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { animals, updateAnimal, deleteAnimal } = useAnimalsData();
  const { loading, setLoading } = useInteraction();

  const animal = animals.find((a) => a.id === parseInt(id, 10));
  const [editMode, setEditMode] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (animal) setFormData({ ...animal });
  }, [animal]);

  if (!animal) return <p className="p-6">Nincs ilyen állat.</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateAnimal(animal.id);
    setEditMode(false);
  };

  const handleDelete = () => setConfirmOpen(true);
  const confirmDelete = async () => {
    setLoading(true);
    await setDelay(500);
    deleteAnimal(animal.id);
    setConfirmOpen(false);
    setLoading(false);
    navigate(-1);
  };
  const cancelDelete = () => setConfirmOpen(false);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl w-full mx-auto">
        <button className="btn btn-ghost mb-4" onClick={() => navigate(-1)}>
          ← Vissza
        </button>

        <div className="card shadow-lg p-6 bg-base-100">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">
              {animal.name}{" "}
              <span className="text-sm text-base-content/60">#{animal.id}</span>
            </h2>

            <div className="flex gap-2">
              {!editMode && (
                <button
                  className="btn btn-primary"
                  onClick={() => setEditMode(true)}
                >
                  Módosítás
                </button>
              )}
              {editMode && (
                <button
                  type="submit"
                  form="animal-form"
                  className="btn btn-success"
                >
                  Mentés
                </button>
              )}
              <button className="btn btn-error" onClick={handleDelete}>
                Törlés
              </button>
            </div>
          </div>

          {editMode ? (
            <form
              id="animal-form"
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto p-4"
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

                required
                className="input w-full"
              />
              <input
                name="nextVaccinationDate"
                value={formData.nextVaccinationDate || ""}
                onChange={handleChange}
                pattern="^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$"
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
              <div className="flex gap-2 mt-2">
                <button type="submit" className="btn btn-success">
                  Mentés
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditMode(false)}
                >
                  Mégse
                </button>
              </div>
            </form>
          ) : (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <div>
                <dt className="text-sm text-base-content/70">Név</dt>
                <dd className="font-medium">{animal.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-base-content/70">ID</dt>
                <dd className="font-medium">#{animal.id}</dd>
              </div>
              <div>
                <dt className="text-sm text-base-content/70">Faj</dt>
                <dd className="font-medium">{animal.species}</dd>
              </div>
              <div>
                <dt className="text-sm text-base-content/70">Fajta</dt>
                <dd className="font-medium">{animal.breed}</dd>
              </div>
              <div>
                <dt className="text-sm text-base-content/70">Nem</dt>
                <dd className="font-medium">{animal.gender}</dd>
              </div>
              <div>
                <dt className="text-sm text-base-content/70">Születési dátum</dt>
                <dd className="font-medium">{animal.birthDate}</dd>
              </div>
              <div>
                <dt className="text-sm text-base-content/70">Gazdi</dt>
                <dd className="font-medium">{animal.ownerName}</dd>
              </div>
              <div>
                <dt className="text-sm text-base-content/70">Gazdi telefon</dt>
                <dd className="font-medium">{animal.ownerPhone}</dd>
              </div>
              <div>
                <dt className="text-sm text-base-content/70">Utolsó oltás</dt>
                <dd className="font-medium">{animal.lastVaccinationDate}</dd>
              </div>
              <div>
                <dt className="text-sm text-base-content/70">Következő oltás</dt>
                <dd className="font-medium">{animal.nextVaccinationDate}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm text-base-content/70">Megjegyzés</dt>
                <dd className="whitespace-pre-wrap">{animal.notes}</dd>
              </div>
            </dl>
          )}
        </div>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Állat törlése"
        message={`Tényleg törölni szeretnéd ${animal?.name} adatait?`}
        confirmText="Törlés"
        cancelText="Mégse"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        isLoading={loading}
      />
    </div>
  );
}