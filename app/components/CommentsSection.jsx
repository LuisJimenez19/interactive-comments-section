"use client";
import React, { useContext, useEffect, useState } from "react";
import FormNewComment from "./FormNewComment";
import CardComment from "./CardComment";
import axios from "axios";
import ModalDelete from "./ModalDelete";
import { useMainConext } from "../hooks/useContext";
import { Toaster } from "react-hot-toast";

function CommentsSection({ initialComments }) {
  const [comments, setComments] = useState(initialComments);

  const { showModal } = useMainConext();

  async function getComments() {
    try {
      const res = await axios("/api/comments");
      const initialComments = res.data.comments.filter(
        (comment) => !comment.replyingTo
      );

      setComments(initialComments);
    } catch (error) {
      console.log(error);
      setComments([]);
    }
  }

  return (
    <>
      <main className="container">
        {comments.map((comment, index) => {
          const delay = `${index / 10}s`
          return (
            <CardComment
              getComments={getComments}
              key={comment._id}
              comment={comment}
              delay={delay}
            />
          );
        })}

        <FormNewComment className={`principal `} getComments={getComments} />
      </main>
      {showModal ? <ModalDelete getComments={getComments} /> : null}
      <Toaster />
    </>
  );
}

export default CommentsSection;
