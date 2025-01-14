import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { checkStorage, getIdFromStorage } from "../../util/storage";

function CreatePost(){

    const [error, setError] = useState();
    const [creating, setCreating] = useState(false);
    const [formData, setFormData] = useState({});
    const [startCreate, setCreate] = useState(false);
    const [token, setToken] = useState(null);

    if (!token) {
        const possibleToken = checkStorage();
        setToken(possibleToken);
    }

    const navigate = useNavigate();
    useEffect( () => {
        async function postsFetch() {
            if (!(Object.hasOwn(formData, "title") && Object.hasOwn(formData, "content") && Object.hasOwn(formData, "published"))) {
                return;
            }
            setCreating(true);
            const response = await fetch(`http://localhost:8080/posts`, {method: "POST",
                body: JSON.stringify({title: formData.title, content: formData.content, published: formData.published,  user: getIdFromStorage()}),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            });
            if (!response.ok) {
                await response.json().then(function(err) {
                    setError(Object.values(err));
                    setCreating(false);
                })
            } else {
                navigate(`/posts`)

            }
        }
        postsFetch();
    }, [startCreate]);



    const handleSubmit = (event) => {
        event.preventDefault();
        setFormData({title: event.target.title.value, content: event.target.content.value, published: Boolean(event.target.publish.value)});
        setCreate(!startCreate);
    }

    return (
        <div>
            <div>{error} </div>
            {!token ? <Link to="/login">Login here</Link> : creating ? <div> creating comment... </div> : 
                <form onSubmit={handleSubmit}>
                <input type="text" name="title"/>
                <textarea name="content" id="" rows="10" cols="50"></textarea>
                <fieldset>
                    <legend>Publish the Post?</legend>
                    <div>
                        <label>No:
                            <input type="radio" id="nopublish" name="publish" value="false" />
                        </label>
                        <label>Yes:
                            <input type="radio" id="yespublish" name="publish" value="true" required checked readOnly/>
                        </label>
                    </div>
                </fieldset>
                <button type="submit">Create Post</button>
                </form>
            }
        </div>
    )


};

export {CreatePost};