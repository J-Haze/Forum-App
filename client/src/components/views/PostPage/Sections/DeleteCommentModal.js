import React from "react";


function DeleteCommentModal(props) {
  return (
    <div className="confirm-modal">
      <div
        className="confirm-modal-content"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <span
          className="close"
          onClick={() => {
            props.hideDeleteCommentModal();
          }}
        >
          &times;
        </span>
        <div id="action-message">
          Are you sure you want to delete this comment?
        </div>
        <div id="action-sub-message">This action cannot be undone.</div>
        <div id="submit-btn-cont">
          <div
            id="submit-decline"
            className="confirmation-btn"
            onClick={() => {
              props.hideDeleteCommentModal();
            }}
          >
            Cancel
          </div>
          <div
            id="submit-confirmation"
            className="confirmation-btn"
            onClick={() => {
              props.deleteComment(props.commentid);
            }}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteCommentModal;
