import { useState } from "react" 
import { DateTime } from "luxon"
// import {}


export default function PostCard ({title, body, created_at, username, isliked}){
    const [liked, setLiked] = useState(isliked)
    const timeStamp = DateTime.fromISO(created_at).toFormat("yyyy LLL dd, hh:mm a") 
    console.log(isliked)
    /*
    each card will need a way to figure out if its liked or not but i dont want to pull this in until the liked info has beeen loaded in, we can have logic here that will not return something untill the like has been loaded in.
    
    would it makes sense to have a loading boundry later on that will be a context that these components need -> this will all need thing to load in before needed?

    -> 
    */
    return (
    <div className="text-sky-400 border-solid border-2 border-sky-500 bg-slate-500 rounded-md w-96 h-40 flex flex-col">
        <h2 className="text-lg bg-slate-100">{title} by {username}</h2>
        <p className="h-2/3">{body}</p>
        <div className="bg-slate-100 flex justify-between">
            <p>{liked ? "true" : "false"}</p>
            <p>{timeStamp}</p>
        </div>
    </div>
    )
};