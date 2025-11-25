# PetBase – Állatorvosi nyilvántartó rendszer
Egy modern, React alapú alkalmazás, amely lehetővé teszi háziállatok adatainak kezelését: felvitelét, szerkesztését, keresését, szűrését és törlését.

## Funkciók
- Bejelentkezés (admin/admin)
- Állatok listázása
- Keresés és szűrés
- Új állat felvétele
- Adatok szerkesztése és törlése
- LocalStorage alapú mentés

## Használt technológiák
- Vite
- React 19
- React Router
- Tailwindcss
- DaisyUI

## Telepítés
```bash
npm install
npm run dev
```

## Struktúra
```
src/
├── components/
│    ├── AnimalCard.jsx
│    ├── Filters.jsx
│    └── ConfirmModal.jsx
│
├── contexts/
│    ├── Animals.jsx
│    ├── Interaction.jsx
│    └── UserData.jsx
│
├── pages/
│    ├── LoginPage.jsx
│    ├── AppPage.jsx
│    ├── AddAnimalPage.jsx
│    └── AnimalDetailsPage.jsx
│
├── layouts/
│    └── Auth.jsx
│
├── utils/
│    ├── animals.js
│    ├── user.js
│    └── delay.js
│
├── main.jsx
└── index.css
```