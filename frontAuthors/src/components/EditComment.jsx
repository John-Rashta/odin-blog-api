import {useState, useEffect} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { checkStorage} from "../../util/storage";

function EditComment() {
    const [formData, setFormData] = useState({content:""});
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [startEdit, setEdit] = useState(false);
    const [error, setError] = useState();
    const [editing, setEditing] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    
    if (!token) {
        const possibleToken = checkStorage();
        setToken(possibleToken);
    } 

    useEffect( () => {
        async function postsFetch() {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/posts/${params.postid}/comments/${params.commentid}`, {mode: "cors", method: "GET"});
            response.json().then(function(data) {
                setFormData(data);
                if (!data) {
                    navigate("/");
                } else {
                    setFormData({content: data.content});
                    setLoading(false);
                }
            })
        }
        postsFetch();
    }, []);

    useEffect( () => {
        async function postsFetch() {
            if (!startEdit) {
                return;
            }
            setEditing(true);
            const response = await fetch(`http://localhost:8080/posts/${params.postid}/comments/${params.commentid}`, {method: "PUT",
                body: JSON.stringify({content: formData.content,}),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            });
            if (!response.ok) {
                await response.json().then(function(err) {
                    setError(Object.values(err)); 
                    setEdit(false);
                    setEditing(false);
                })
            } else {
                setEdit(false);
                setEditing(false);
                navigate(`/posts/${params.postid}`);

            }
        }
        postsFetch();
    }, [startEdit]);

    return (
        <div>
            <div>{error} </div>
            {loading ? <div> Loading... </div> : !token ? <Link to="/login">Login here</Link> : editing ? <div> editing comment... </div> : 
                <form>
                <textarea
                onChange={(e) => {
                    setFormData({content: e.target.value});

                }}
                 value={formData.content} name="content" id="" rows="10" cols="50"></textarea>
                <button
                onClick={(e) => {
                    e.preventDefault();
                    setEdit(true);
                }}
                >Edit Comment</button>
                </form>
            }
        </div>
    )
}

export {EditComment};