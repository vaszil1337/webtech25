import { useNavigate } from "react-router-dom";

export default function AnimalCard({ animal }) {
  const navigate = useNavigate();

  const birthDate = new Date(animal.birthDate);
  const ageInMilliseconds = Date.now() - birthDate.getTime();
  const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

  return (
    <div
      className="card bg-gradient-to-br from-base-300 via-base-200 to-base-300 transition transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={() => navigate(`/app/animal/${animal.id}`)}
    >
      <div className="card-body">
        {/* Állat neve */}
        <h2 className="card-title text-lg font-bold text-petbase-text">
          {animal.name}
        </h2>

        {/* Faj és fajta */}
        <div className="flex flex-row items-center">
          {animal.gender === 'kan' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="pr-1" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8" />
          </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="pr-1" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5" />
          </svg>}
          <p className="text-sm text-gray-600">
          <span className="font-medium">{animal.species}</span> — {animal.breed}
        </p>
        </div>
        

        {/* Születési dátum */}
        <div className="flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="pr-1" viewBox="0 0 16 16">
            <path d="m7.399.804.595-.792.598.79A.747.747 0 0 1 8.5 1.806V4H11a2 2 0 0 1 2 2v3h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1V6a2 2 0 0 1 2-2h2.5V1.813a.747.747 0 0 1-.101-1.01ZM12 6.414a.9.9 0 0 1-.646-.268 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0A.9.9 0 0 1 4 6.414v1c.49 0 .98-.187 1.354-.56a.914.914 0 0 1 1.292 0c.748.747 1.96.747 2.708 0a.914.914 0 0 1 1.292 0c.374.373.864.56 1.354.56zm2.646 5.732a.914.914 0 0 1-1.293 0 1.914 1.914 0 0 0-2.707 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0L1 11.793v1.34c.737.452 1.715.36 2.354-.28a.914.914 0 0 1 1.292 0c.748.748 1.96.748 2.708 0a.914.914 0 0 1 1.292 0c.748.748 1.96.748 2.707 0a.914.914 0 0 1 1.293 0 1.915 1.915 0 0 0 2.354.28v-1.34z" />
          </svg>
          <p className="text-sm text-gray-400">
            <span className="font-medium">{animal.birthDate} - {ageInYears} éves</span>
          </p>
        </div>

        {/* Gazdi */}
        <div className="flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="pr-1 w-max h-max" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          <p className="text-sm text-gray-500">
            {animal.ownerName}
          </p>
        </div>


        {/* Oltás információ */}
        {animal.nextVaccinationDate ? (
          <div className="flex flex-row mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="pr-1" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
            </svg>
            <p className="text-xs">
              Következő oltás: <span className="text-petbase-pink">{animal.nextVaccinationDate}</span>
            </p>
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic mt-1">Nincs oltási adat</p>
        )}
      </div>
    </div>
  );
}
