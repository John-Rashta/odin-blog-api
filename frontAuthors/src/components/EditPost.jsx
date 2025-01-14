import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { checkStorage} from "../../util/storage";

function EditPost(){
    const [error, setError] = useState();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({title: "", content: ""});
    const [startEdit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    if (!token) {
        const possibleToken = checkStorage();
        setToken(possibleToken);
    } 

    useEffect( () => {
        async function postsFetch() {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/posts/${params.postid}`, {mode: "cors", method: "GET",});
            if (!response.ok) {
                navigate("/");
            }
            response.json().then(function(data) {
                if (!data) {
                    navigate("/");
                } else {
                    setFormData({title: data.title, content: data.content});
                    setLoading(false);
                }
            })
        }
        if (token) {
            postsFetch();
        }
    }, []);

    useEffect( () => {
        async function postsFetch() {
            if (!startEdit) {
                return;
            }
            setEditing(true);
            const response = await fetch(`http://localhost:8080/posts/${params.postid}`, {method: "PUT",
                body: JSON.stringify({title: formData.title, content: formData.content,}),
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
                navigate(`/posts`);

            }
        }
        postsFetch();
    }, [startEdit]);

    return (
        <div>
            <div>{error} </div>
            {loading ? <div> Loading... </div> : !token ? <Link to="/login">Login here</Link> : editing ? <div> editing post... </div> : 
                <form>
                <input
                onChange={(e) => {
                    setFormData({...formData, title: e.target.value});

                }}
                 value={formData.title} type="text" name="title"/>
                <textarea
                onChange={(e) => {
                    setFormData({...formData, content: e.target.value});

                }}
                 value={formData.content} name="content" id="" rows="10" cols="50"></textarea>
                <button
                onClick={(e) => {
                    e.preventDefault();
                    setEdit(true);
                }}
                >Edit Post</button>
                </form>
            }
        </div>
    )



};

export {EditPost};