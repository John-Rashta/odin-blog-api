import {Link} from "react-router-dom";
import { useEffect, useState } from "react";

function MiniComment({data, postid, token, fetchAgain}) {
    const [ deleted, setDeleted] = useState(false);

    useEffect( () => {
        async function postsFetch() {
            if (!deleted) {
                return;
            }
            const response = await fetch(`http://localhost:8080/posts/${ postid}/comments/${data.id}`, {method: "DELETE",
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
            <div>{data.email} </div>
            <div>{data.content} </div>
            <div>{data.create_date} </div>
            <button
            onClick={ () => {
                setDeleted(true);
            }}
            >Delete</button>
            <Link to={`/posts/${postid}/${data.id}/edit`} state={data} ><button>Edit Comment</button></Link>
        </div>
    )
}

export {MiniComment};