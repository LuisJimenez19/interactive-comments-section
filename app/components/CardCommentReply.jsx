"use client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import CardComment from "./CardComment";

import "@/app/css/comment-reply.css";

function CardCommentReply({ replyId, getComments, commentParent }) {
  const [comment, setComment] = useState({});

  const [contentToUpdated, setContentToUpdated] = useState(""); // si cambia hace de nuevo la petición

  const [loading, setLoading] = useState(true);
  const getReplies = useCallback(async () => {
    try {
      const res = (await axios(`/api/comments/${replyId}`)).data;
      setComment(res.comments);
      setContentToUpdated(res.comments.content.trim());

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      return null;
    }
  }, [replyId, contentToUpdated]);

  useEffect(() => {
    getReplies();
  }, [getReplies]);

  return (
    <>
      {!loading && (
        <CardComment
          commentParent={commentParent}
          getComments={getComments}
          comment={comment}
          isUpdated={{ contentToUpdated, setContentToUpdated }}
        />
      )}
    </>
  );
}

export default CardCommentReply;
