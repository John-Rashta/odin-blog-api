import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { clearStorage, checkStorage } from "../../util/storage";

function Index(){
    const [token, setToken] = useState(null);
    const [checkVisit, setVisit] = useState(false);

    if (!token &&  !checkVisit) {
        const possibleToken = checkStorage();
        setToken(possibleToken);
        setVisit(true);
    }

    return (
        <div>
            <main>
                {
                    !token ? <Link to="/login">Login</Link> : 
                    <div>
                        <Link to="/posts">Posts</Link>
                        <Link to="/create/posts">Create a Post</Link>
                        <a href=""
                        onClick={clearStorage}
                        >Logout</a>
                    </div>
                }
            </main>
        </div>
    )

};

export {Index};