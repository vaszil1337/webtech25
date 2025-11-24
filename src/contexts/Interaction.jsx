import { createContext, useContext, useState } from 'react';

export const InteractionContext = createContext(null);

export function InteractionProvider({ children }) {
    const [loading, setLoading] = useState(false);
    return (
        <InteractionContext.Provider value={{ loading, setLoading }}>
            {children}
        </InteractionContext.Provider>
    );
}

export function useInteraction() {
    const context = useContext(InteractionContext);
    if (context === null) {
        throw new Error("useInteraction must be used within an InteractionProvider");
    }
    return context; // { loading, setLoading }
}