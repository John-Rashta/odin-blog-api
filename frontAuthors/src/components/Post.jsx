import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { MiniComment } from "./MiniComment";
import { checkStorage} from "../../util/storage";

function Post() {
    const [postData, setPostData] = useState({});
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [fetching, setFetching] = useState(false);

    const params = useParams();

    if (!token) {
        const possibleToken = checkStorage();
        setToken(possibleToken);
    }

    function fetchAgain() {
        setFetching(!fetching);
    }
    
    
    useEffect( () => {
        async function postsFetch() {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/posts/${params.postid}/comments`, {mode: "cors", method: "GET"});
            response.json().then(function(data) {
                setPostData(data);
                setLoading(false);
            })
        }
        postsFetch();
    }, [fetching]);

    return (
         <main>
            {loading ? <div></div> : (Object.hasOwn(postData, "title") && Object.hasOwn(postData, "content") && Object.hasOwn(postData, "create_date")) && 
                <div>
                <div>{postData.title} </div>
                <div>{postData.content} </div>
                <div>{postData.create_date} </div>
            </div> 
            }
            {
                    loading ? <div>Loading comments...</div> : <div> {Object.hasOwn(postData, "comments") && postData.comments.map((comment) => {
                        return <MiniComment key={comment.id} data={comment} postid={postData.id} token={token} fetchAgain={fetchAgain} />
                    })} </div>
                }
         </main>
    )

};

export {Post};