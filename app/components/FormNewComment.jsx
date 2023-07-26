/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import React, { useState } from "react";
import { CURREND_ID } from "../config";
import { toast } from "react-hot-toast";

import "@/app/css/form-new-comment.css";

function FormNewComment({
  action = "send",
  userToreply = false,
  getComments,
  commentParent = false,
  setUserToreply,
  className = "",
}) {
  const stateInitial = userToreply ? `@${userToreply.userName}` : "";

  const [data, setData] = useState(stateInitial);

  function handleChange(e) {
    const value = e.target.value;
    if (action === "reply") {
      if (userToreply && value.startsWith(`@${userToreply.userName}`)) {
        //no borra el usuario mencionado
        setData(value);
      } else {
        setData(`@${userToreply.userName}`);
      }
    } else {
      setData(value);
    }
  }

  async function handelSubmit(e) {
    e.preventDefault();
    const comment = data.trim();
    /* si va a crear un nuevo comentario */
    if (!comment || comment.length <= 2) {
      return toast("Enter a valid comment.", {
        duration: 2000,
        position: "bottom-center",
      });
    }
    if (action === "send") {
      try {
        const res = await axios.post(`/api/comments/${CURREND_ID}`, {
          content: comment,
        });
        res.status == 200 && getComments();
        toast.success("Comment added successfully.");
        setData("");
      } catch (error) {
        console.log(error);
      }
    } else if (action === "reply") {
      try {
        const newData = {
          content: comment.replace(`@${userToreply.userName}`, "").trim(),
          replyingTo: userToreply.userId,
          commentId: commentParent || userToreply.commentId, // le paso el comentario que puede ya ser un hijo
        };
        const res = await axios.post(`/api/replies/${CURREND_ID}`, newData);
        res.status === 200 && getComments();
        setUserToreply({});
        toast.success("Answer added successfully");
        setData("");
      } catch (error) {
        console.log(error);
        toast.error("An error has occurred");
      }
    }
  }

  return (
    <div className={`container-form ${className}`}>
      <img
        className="avatar-user-current"
        src="/images/avatars/image-juliusomo.webp"
        alt="avata-user"
      />
      <form className="form" onSubmit={handelSubmit}>
        <textarea
          className="new-comment"
          name="content"
          id="new"
          placeholder="Add a comment..."
          maxLength={240}
          value={data}
          onChange={handleChange}
        ></textarea>
        <button
          disabled={stateInitial === data}
          type="submit"
          className={`btn-submit ${stateInitial === data && "disabled"}`}
        >
          {action}
        </button>
      </form>
    </div>
  );
}

export default FormNewComment;
