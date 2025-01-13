import {useState, useEffect} from "react";
import { MiniPost } from "./MiniPost";
import { checkStorage, getIdFromStorage } from "../../util/storage";
import {Link} from "react-router-dom";

function Posts(){
    const [postsData, setPostsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [fetching, setFetching] = useState(false);

    if (!token) {
        const possibleToken = checkStorage();
        setToken(possibleToken);
    }

    useEffect( () => {
        async function postsFetch() {
            setLoading(true);
            console.log('hello')
            const response = await fetch(`http://localhost:8080/users/${getIdFromStorage()}/posts`, {mode: "cors", method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }, 
            });
            response.json().then(function(data) {
                setPostsData(data.posts);
                setLoading(false);
            })
        }
        if (token) {
            postsFetch();
        }
    }, [fetching]);
    
    function fetchAgain() {
        setFetching(!fetching);
    }
    
    return (
        <div>
            <main>
                {
                    loading ? <div>Loading...</div> : <div> {postsData.length > 0 && postsData.map((post) => {
                        return <MiniPost key={post.id} data={post} fetchAgain={fetchAgain} token={token} />
                    })}
                    <Link to="/create/posts">Create Post</Link>
                     </div>
                }
            </main>
        </div>
    )

};

export {Posts};