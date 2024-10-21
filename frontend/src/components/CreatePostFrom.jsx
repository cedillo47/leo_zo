import { createPost } from "../adapters/post-adapter";

export default function CreatePostForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [post, error] = await createPost(Object.fromEntries(formData));

    if(error){
      throw new Error(`${error}`) // we can add to this later
    }
    event.target.reset();
  };

  return <form onSubmit={handleSubmit} aria-labelledby="create-post-heading">
    <h2 id="create-post-heading">Create a new Post</h2>
    <label htmlFor='title'>Post Title</label>
    <input type='text' id='title' name='title' required/>
    <label htmlFor='body'>Content</label>
    <textarea type='text' id='body' name='body' rows={7}required/>
    <button>Create Post</button>
  </form>;
}