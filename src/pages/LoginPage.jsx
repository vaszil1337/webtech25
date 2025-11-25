import { useEffect, useState } from "react"
import { useUserData } from "../contexts/UserData"
import { useInteraction } from "../contexts/Interaction";
import { useNavigate } from "react-router-dom";
import { setDelay } from "../utils/delay";

export default function LoginPage() {
    const { user, login } = useUserData();
    const { loading, setLoading } = useInteraction();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user === undefined || user === null) return;
        if (user.isLoggedIn) navigate("/app", { replace: true });
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true);
        
        try {
            await setDelay(1000);

            if (userInput === "admin" && passwordInput === "admin") {
                login({
                    username: userInput,
                });
                return;
            }
            setError("Hibás felhasználónév vagy jelszó!");
        } finally {
            setLoading(false);
        }
    }

    if (user === undefined) return <span className="loading loading-spinner loading-lg"></span>

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-[30rem] bg-base-100 shadow-lg">
                <figure>
                    <img className="max-h-40" src="logo.png" alt="Logó" />
                </figure>
                <div className="card-body">

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="form-control">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-lg text-petbase-blue">Felhasználónév</legend>
                            <input
                                className="input w-full border-petbase-teal text-base-content"
                                type="text"
                                placeholder="felhasználónév"
                                value={userInput}
                                onChange={(e) => { setUserInput(e.target.value); setError(""); }}
                                name="username"
                                autoComplete="username"
                                required
                            />
                            </fieldset>
                        </div>

                        <div className="form-control">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-lg text-petbase-blue">Jelszó</legend>

                                <input
                                className="input w-full border-petbase-teal text-base-content"
                                type="password"
                                placeholder="********"
                                value={passwordInput}
                                onChange={(e) => { setPasswordInput(e.target.value); setError(""); }}
                                name="password"
                                autoComplete="current-password"
                                required
                            />
                            </fieldset>
                        </div>

                        <div className="flex justify-center min-h-6">
                            {loading ? <span className="loading loading-spinner loading-md"></span> : null}
                            {error && <div className="text-sm text-error">{error}</div>}
                        </div>

                        <div className="form-control mt-2 flex justify-center">
                            <button className="btn bg-petbase-teal text-lg text-base-content hover:bg-petbase-teal/70" type="submit">Bejelentkezés</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}