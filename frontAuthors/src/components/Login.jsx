import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { saveInStorage } from "../../util/storage";

function Login(){
    const [logging, setLogging] = useState(false);
    const [error, setError] = useState();
    const [formData, setFormData] = useState({});
    const [startLogin, setLogin] = useState(false);

    const navigate = useNavigate();

    useEffect( () => {
        async function postsFetch() {
            if (!(Object.hasOwn(formData, "username") && Object.hasOwn(formData, "password"))) {
                return;
            }
            setLogging(true);
            const response = await fetch(`http://localhost:8080/login`, {method: "POST",
                body: JSON.stringify({ username: formData.username, password: formData.password}),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if (!response.ok || response.status !== 200) {
                if (response.status === 401) {
                    setLogging(false);
                    return;
                }
                await response.json().then(function(err) {
                    setError(Object.values(err));
                    setLogging(false);
                })
            } else {
                const tokenData = await response.json();
                saveInStorage(tokenData);
                navigate(`/`);

            }
        }
        postsFetch();
    }, [startLogin]);



    const handleSubmit = (event) => {
        event.preventDefault();
        setFormData({username: event.target.username.value, password: event.target.password.value});
        setLogin(!startLogin);
    }


    return (
        <div>
        <div>{error} </div>
        { logging ? <div> logging in... </div> : 
            <form onSubmit={handleSubmit}>
            <input type="text" name="username"/>
            <input type="password" name="password"/>
            <button type="submit">Login</button>
            </form>
        }
    </div>
       
    )
};

export {Login};