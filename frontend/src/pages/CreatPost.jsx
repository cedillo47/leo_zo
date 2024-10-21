import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createPost } from "../adapters/post-adapter";
import CreatePostForm from "../components/CreatePostFrom";

export default function CreatePostPage() {
  return (
    <>
      <h1>Create post here</h1>
      <CreatePostForm />
    </>
  );
}
