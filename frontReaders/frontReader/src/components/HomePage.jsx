import {useState, useEffect} from "react";

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

    console.log(postsData)

    return (
        <div>
            <main>
                {
                    loading ? <div>LOADING</div> : <div>LOADED</div>
                }
                
            </main>
        </div>
    )

};

export {HomePage};