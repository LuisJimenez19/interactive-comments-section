import React from "react";
import "@/app/css/modal-delete.css";
import { useMainConext } from "../hooks/useContext";
import { toast } from "react-hot-toast";

function ModalDelete({ getComments }) {
  const { handleShowModal, handleDelete } = useMainConext();

  function handleCancel() {
    handleShowModal();
  }
  async function handleOnDelete() {
    const res = await handleDelete();

    if (res) {
      getComments();
      toast.success("Comment deleted")
      return handleShowModal();
    } else {
      alert("ocurrio un error");
    }
  }

  return (
    <div className="modal-bg">
      <div className="card-modal flex flex-col flex-center">
        <h2 className="modal__title">Delete comment</h2>
        <p className="modal__text">
          Are yor sure you want to delete this comment? Whis will remove the
          comment and can´t be undone.
        </p>
        <footer className="modal__btns">
          <button
            onClick={handleOnDelete}
            className="btn btn-action btn-delete"
          >
            yes, delete
          </button>
          <button onClick={handleCancel} className="btn btn-action btn-cancel">
            no, cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ModalDelete;
