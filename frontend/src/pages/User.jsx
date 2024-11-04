import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import { getUserPost } from "../adapters/post-adapter"
import PostCard from "../components/PostCard";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams(); //this is only for checking to see if the user that we moved in here with is the the curr user.
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);
  const [userPost, setUserPost] = useState([])

  
  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.message);
      setUserProfile(user);
    };

    const post = async () => {
      const [post, error] = await getUserPost();
      if (error) return setErrorText(error.message);
      setUserPost(post);
    }


    post();
    loadUser();
  }, [id]);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  if (!userProfile && !errorText && !userPost.length) return null;
  if (errorText) return <p>{errorText}</p>;

  // What parts of state would change if we altered our currentUser context?
  // Ideally, this would update if we mutated it
  // But we also have to consider that we may NOT be on the current users page
  const profileUsername = isCurrentUserProfile ? currentUser.username : userProfile.username;

  return <>
    {/* <div className="mx-10"> */}

    <h1>{profileUsername}</h1>
    {!!isCurrentUserProfile && <button className="border-solid  border-2 border-gray-500 bg-indigo-500 hover:bg-blue-950" onClick={handleLogout}>Log Out</button>}
    <p>If the user had any data, here it would be</p>
    <p>Fake Bio or something</p>
    {
      !!isCurrentUserProfile
      && <UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
    }
    <>
    <div className="flex flex-wrap gap-4 justify-center">
    {
      userPost.map(post => <PostCard key={post.id} {...post}/>)
    }
    </div> 
    </>
    {/* </div> */}
  </>;
}
