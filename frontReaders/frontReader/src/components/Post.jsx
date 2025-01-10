import {useParams, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { MiniComment } from "./MiniComment";

function Post() {
    const [postData, setPostData] = useState({});
    const [loading, setLoading] = useState(false);
    const params = useParams();

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
    }, []);

    return (
         <main>
            <Link to={`/posts/${params.postid}/createcomment`}><button>Create Comment</button> </Link>
            {loading ? <div></div> : (Object.hasOwn(postData, "title") && Object.hasOwn(postData, "content") && Object.hasOwn(postData, "create_date")) && 
                <div>
                <div>{postData.title} </div>
                <div>{postData.content} </div>
                <div>{postData.create_date} </div>
            </div> 
            }
            {
                    loading ? <div>LOADING COMMENTS</div> : <div> {Object.hasOwn(postData, "comments") && postData.comments.map((comment) => {
                        return <MiniComment key={comment.id} data={comment} postid={postData.id} />
                    })} </div>
                }
         </main>
    )

};

export {Post};