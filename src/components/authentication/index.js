import { useState, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Input from "../input";

function Authentication({ t, loginHandler, error, auth }) {
    const cn = bem("Authentication");
    const navigate = useNavigate()
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        // input debounce
        if (login && password) {
            loginHandler({ login, password, navigate });
        }
    };

    useEffect(() => {
        if (auth) {
            setLogin("")
            setPassword("")
        }
    }, [auth])

    return (
        <form className={cn()}
            onSubmit={submitHandler}
            onKeyDown={(e) => e.key === "Enter" && submitHandler(e)}
        >
            <div className={cn("Input_wrapper")}>
                <label htmlFor={"login"}>{t.login}</label>
                <Input
                    id="login"
                    name="login"
                    type="text"
                    onChange={setLogin}
                    value={login}
                />
            </div>
            <div className={cn("Input_wrapper")}>
                <label htmlFor={"password"}>{t.password}</label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={setPassword}
                    value={password}
                />
            </div>
            {error && <span className={cn("Error")}>{error}</span>}
            <button type="submit">{t.submit}</button>
        </form>
    );
}

export default memo(Authentication);