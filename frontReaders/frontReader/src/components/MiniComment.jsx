import {Link} from "react-router-dom";

function MiniComment({data, postid}) {
    return (
        <div>
            <div>{data.email} </div>
            <div>{data.content} </div>
            <div>{data.create_date} </div>
            <Link to={`/posts/${postid}/comments/${data.id}`} state={data} ><button>Check Comment</button></Link>
        </div>
    )
}

export {MiniComment};