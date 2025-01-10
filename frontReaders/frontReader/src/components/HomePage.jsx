import {useState, useEffect} from "react";
import { MiniPost } from "./MiniPost";

function HomePage() {
    const [postsData, setPostsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        async function postsFetch() {
            setLoading(true);
            const response = await fetch("http://localhost:8080/posts", {mode: "cors", method: "GET"});
            response.json().then(function(data) {
                setPostsData(data);
                setLoading(false);
            })
        }
        postsFetch();
    }, []);

    return (
        <div>
            <main>
                {
                    loading ? <div>LOADING</div> : <div> {postsData.length > 0 && postsData.map((post) => {
                        return <MiniPost key={post.id} data={post} />
                    })} </div>
                }
            </main>
        </div>
    )

};

export {HomePage};