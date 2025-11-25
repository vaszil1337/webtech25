import { setDelay } from "../utils/delay";
import { useUserData } from "../contexts/UserData";
import { useInteraction } from "../contexts/Interaction";

export default function Navbar() {
    const { logout } = useUserData();
    const { loading, setLoading } = useInteraction();

    const handleLogout = async () => {
        setLoading(true);
        await setDelay(1000);
        setLoading(false);
        logout();
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1 flex items-center">
                <div className="flex flex-row gap-2 items-center">
                    <img className="max-h-12" src="logo-plain.png" alt="Logó" />
                    <a href="/" className="btn btn-ghost text-xl">PetBase</a>
                </div>
            </div>
            <div className="flex-none">
                <button className="btn btn-ghost" onClick={handleLogout}>
                    {loading ? <span className="loading loading-spinner"></span> : "Kijelentkezés"}
                </button>
            </div>
        </div>
    )
}