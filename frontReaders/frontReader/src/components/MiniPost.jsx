import {Link} from "react-router-dom";

function MiniPost({data}) {
    return (
        <div>
            <div>{data.title} </div>
            <div>{data.content} </div>
            <div>{data.create_date} </div>
            <Link to={`/posts/${data.id}`}><button>Check Post</button></Link>
        </div>
    )
}

export {MiniPost};