import {Link} from "react-router-dom";
import { useEffect, useState } from "react";

function MiniPost({data, fetchAgain, token}) {
    const [published, setPublished] = useState(data.published);
    const [startPublishing, setPublishing] = useState(false);
    const [ deleted, setDeleted] = useState(false);

    useEffect( () => {
        async function postsFetch() {
            if (!startPublishing) {
                return;
            }
            const response = await fetch(`http://localhost:8080/posts/${ data.id}`, {method: "PUT",
                body: JSON.stringify({published: !published}),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            });
            if (!response.ok) {
                setPublishing(false);
                return;
            } else {
                setPublished(!published);
                setPublishing(false);
            }
        }
        postsFetch();
    }, [startPublishing]);

    useEffect( () => {
        async function postsFetch() {
            if (!deleted) {
                return;
            }
            const response = await fetch(`http://localhost:8080/posts/${ data.id}`, {method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            });
            if (!response.ok) {
                setDeleted(false);
                return;
            } else {
                setDeleted(false);
                fetchAgain();
            }
        }
        postsFetch();
    }, [deleted]);
    
    return (
        <div>
            <div>{data.title} </div>
            <div>{data.content} </div>
            <div>{data.create_date} </div>
            <div>{published ?  "Published" : "Not Published"} </div>
            <button
            onClick={ () => {
                setPublishing(true);
            }
            }
            >{published ? "Unpublish" : "Publish"} </button>
            <button
            onClick={ () => {
                setDeleted(true);
            }}
            >Delete</button>
            <Link to={`/posts/edit/${data.id}`}><button>Edit Post</button></Link>
            <Link to={`/posts/${data.id}`}><button>Check Post</button></Link>
        </div>
    )
}

export {MiniPost};