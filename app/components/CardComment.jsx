/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CardCommentReply from "./CardCommentReply";
import { CURREND_ID } from "../config";
import { itWasCreated } from "../helpers";
import FormNewComment from "./FormNewComment";
import CommentsActions from "./CommentsActions";
import UpdateComment from "./UpdateComment";
import Score from "./Score";
// por si es un comentario respuesta
function CardComment({
  comment,
  getComments,
  delay,
  // cuando es un comentario respuesta
  commentParent = false,
  isUpdated = false,
}) {
  const [user, setUser] = useState({}); // the user made who this comment || a quien se le va a responder
  const [userReplying, setUserReplying] = useState({}); // user mention -> se le ha respondido
  const [userToreply, setUserToreply] = useState({}); // user to reply -> se le va a responder

  const [loading, setLoading] = useState(true);

  const [isEditable, setIsEditable] = useState(false); // mostrar el updatedComment

  /* info de el usuario */
  const getDataUser = async (id) => {
    setLoading(true);
    try {
      const res = (await axios(`/api/user/${id}`)).data;
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  /* info del usuario que le estan contestanto */
  async function handleUserRepliyng(id) {
    getDataUser(id).then((e) => {
      setUserReplying(e.user);
    });
  }

  /* Traer al usuario de cada comentario */
  useEffect(() => {
    getDataUser(comment.user).then((e) => {
      setUser(e.user);
      setLoading(false);
    });
    comment.replyingTo && handleUserRepliyng(comment.replyingTo);
    setUserToreply({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* functions later make components */
  async function handleReply({ commentId, userName, userId }) {
    Object.values(userToreply).length == 0
      ? setUserToreply({ commentId, userName, userId })
      : setUserToreply({});
  }

  // if (loading) return <p className="card-comment flex">loading</p>;
  return (
    <>
      <div
        style={{ animationDelay: delay }}
        className={`card-comment flex ${loading ? "loading" : ""}`}
      >
        {/* <---score----> */}
        <Score comment={comment} />

        {/* <---card----> */}
        <div className="card-comment__body flex flex-col">
          <header className="card-comment__header flex justify-between">
            <div className="header_group flex flex-center">
              <img className="header-avatar" alt={`avatar`} src={user.url} />
              <p className="comment-name">
                {user.name}{" "}
                {user._id === CURREND_ID && (
                  <span className="current-user">You</span>
                )}{" "}
              </p>
              <p className="comment-create-at">
                {itWasCreated(comment.createAt)}
              </p>
            </div>
            {/* <----actions----> */}
            <CommentsActions
              setIsEditable={setIsEditable}
              commentId={comment._id}
              commentParent={commentParent}
              getComments={getComments}
              handleReply={handleReply}
              user={user}
            />
          </header>
          <div className="comment__content">
            {!isEditable ? (
              <p>
                {comment.replyingTo && (
                  <span className="user-replying">@{userReplying.name} </span>
                )}
                <span className="content-editable">{comment.content}</span>
              </p>
            ) : (
              /* Actualizar comentario */
              <UpdateComment
                comment={comment} // el comentario
                user={user} // user que hace el comment
                userReplying={userReplying} // si edita uno que le responde a alguien
                isEditable={isEditable}
                getComments={getComments}
                setIsEditable={setIsEditable}
                isUpdated={isUpdated}
              />
            )}
          </div>
        </div>
      </div>
      {/* Formulario para responder */}
      {Object.keys(userToreply).length > 0 ? (
        <FormNewComment
          getComments={getComments}
          action="reply"
          setUserToreply={setUserToreply}
          userToreply={userToreply} // a quien le responde nombre y id comentario
          commentParent={commentParent} // al que debe ser añadido
        />
      ) : null}
      {/* <-------replies------------> */}
      {comment.replies.length !== 0 && (
        <section className="container-replies">
          {comment.replies.map((cm) => {
            return (
              <CardCommentReply
                getComments={getComments}
                key={cm}
                isUpdated={isUpdated}
                replyId={cm} // comentario respuesta
                commentParent={comment._id} // comentario padre
              />
            );
          })}
        </section>
      )}
    </>
  );
}

export default CardComment;
