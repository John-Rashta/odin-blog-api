import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function Comment() {
    const [commentData, setCommentData] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();

    useEffect( () => {
        async function postsFetch() {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/posts/${params.postid}/comments/${params.commentid}`, {mode: "cors", method: "GET"});
            response.json().then(function(data) {
                setCommentData(data);
                setLoading(false);
            })
        }
        postsFetch();
    }, []);

    return (
        <div>
            {loading ? <div> Loading Comment</div> : <div>
                <div>{commentData.email} </div>
                <div>{commentData.content} </div>
                <div>{commentData.create_date} </div>
            </div> }
        </div>
    )
}

export {Comment};