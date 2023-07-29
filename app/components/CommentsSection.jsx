"use client";
import React, { useContext, useEffect, useState } from "react";
import FormNewComment from "./FormNewComment";
import CardComment from "./CardComment";
import axios from "axios";
import ModalDelete from "./ModalDelete";
import { useMainConext } from "../hooks/useContext";
import { Toaster } from "react-hot-toast";
import { validateConfig } from "next/dist/server/config-shared";

function CommentsSection({ initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);

  const { showModal } = useMainConext();

  async function getComments() {
    try {
      const res = await fetch("/api/comments", { cache: "no-store" });
      const initialComments = res.data.comments.filter(
        (comment) => !comment.replyingTo
      );

      setComments(initialComments);
    } catch (error) {
      console.log(error);
      setComments([]);
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <main className="container">
        {comments.map((comment, index) => {
          const delay = `${index / 10}s`;
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
