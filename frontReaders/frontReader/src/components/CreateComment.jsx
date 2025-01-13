import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CreateComment() {
    const [error, setError] = useState();
    const [creating, setCreating] = useState(false);
    const [formData, setFormData] = useState({});
    const [startCreate, setCreate] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect( () => {
        async function postsFetch() {
            if (!(Object.hasOwn(formData, "email") && Object.hasOwn(formData, "content"))) {
                return;
            }
            setCreating(true);
            const response = await fetch(`http://localhost:8080/posts/${params.postid}/comments`, {method: "POST",
                body: JSON.stringify({email: formData.email, content: formData.content}),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                await response.json().then(function(err) {
                    setError(Object.values(err));
                    setCreating(false);
                })
            } else {
                navigate(`/posts/${params.postid}`)

            }
        }
        postsFetch();
    }, [startCreate]);



    const handleSubmit = (event) => {
        event.preventDefault();
        setFormData({email: event.target.email.value, content: event.target.content.value});
        setCreate(!startCreate);
    }

    return (
        <div>
            <div>{error} </div>
            {creating ? <div> creating comment... </div> : 
                <form onSubmit={handleSubmit}>
                <input type="email" name="email"/>
                <textarea name="content" id="" rows="10" cols="50"></textarea>
                <button type="submit">Create Comment</button>
                </form>
            }
        </div>
    )

};

export {CreateComment};