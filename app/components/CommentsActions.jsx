/* eslint-disable @next/next/no-img-element */
"use client";
import { CURREND_ID } from "../config";
import axios from "axios";
import ModalDelete from "./ModalDelete";
import { useState } from "react";
import { useMainConext } from "../hooks/useContext";

import "@/app/css/comment-actions.css"

function CommentsActions({
  user,
  commentId,
  handleReply,
  setIsEditable,
  commentParent,
}) {
  const { handleShowModal } = useMainConext();
  function handleEdit() {
    setIsEditable((old) => !old);
  }

  return (
    <>
      <div className="flex container-actions">
        {user._id === CURREND_ID ? (
          <>
            <span
              onClick={() => {
                handleShowModal(commentId, commentParent);
              }}
              className="flex flex-center action action-delete"
            >
              <img src="/images/icon-delete.svg" alt="icon-delet" />
              delete
            </span>
            <span
              onClick={handleEdit}
              className="flex flex-center action action-edit"
            >
              <img src="/images/icon-edit.svg" alt="icon-edit" />
              edit
            </span>
          </>
        ) : (
          <span
            className="action flex flex-center action-reply"
            onClick={() => {
              handleReply({
                commentId: commentId,
                userName: user.name,
                userId: user._id,
              });
            }}
          >
            <img src="/images/icon-reply.svg" alt="icon-reply" />
            reply
          </span>
        )}
      </div>
    </>
  );
}

export default CommentsActions;
