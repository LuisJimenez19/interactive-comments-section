"use client";
import axios from "axios";
import { createContext, useContext, useState } from "react";

export const context = createContext();

function Context({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState("");
  const [commentToDeleteIsReply, setCommentToDeleteisReply] = useState(false);

  async function handleDelete() {
    let success;
    if (commentToDelete && commentToDeleteIsReply) {
      const res = await axios.patch(
        `/api/replies/${commentToDelete}`,
        {
          commentParentId: commentToDeleteIsReply,
        },
        {
          cache: "no-store",
          next: {
            revalidate: 5,
          },
        }
      );
      success = res.status === 200 ? true : false;
    } else if (commentToDelete) {
      try {
        const res = await axios.delete(`/api/comments/${commentToDelete}`, {
          cache: "no-store",
          next: {
            revalidate: 5,
          },
        });
        console.log(res);
        setCommentToDelete("");
        success = res.status === 200 ? true : false;
      } catch (error) {
        console.log(error);
      }
    }
    return success;
  }

  function handleShowModal(commentId = "", commentParent = false) {
    setShowModal(!showModal);
    commentId ? setCommentToDelete(commentId) : setCommentToDelete("");
    commentParent
      ? setCommentToDeleteisReply(commentParent)
      : setCommentToDeleteisReply(false);
  }

  return (
    <context.Provider
      value={{
        showModal,
        handleShowModal,
        handleDelete,
        commentToDelete,
      }}
    >
      {children}
    </context.Provider>
  );
}

export default Context;
