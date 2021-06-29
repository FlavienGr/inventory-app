import React from "react";

const FlashMessages = ({ errors, msgSuccess, handleCloseFlash }) => {
  const errorMessages = errors.map((error, i) => (
    <div className="alert alert-danger" key={i}>
      <div className="alert-custom">{error.message}</div>
      <button
        onClick={handleCloseFlash}
        type="button"
        className="close"
        data-dismiss="alert"
      >
        &times;
      </button>
    </div>
  ));
  const renderErrors = errors.length === 0 ? undefined : errorMessages;

  if (errors.length > 0) {
    return <>{renderErrors}</>;
  }

  if (msgSuccess) {
    return (
      <>
        <div className="alert alert-success">
          <div className="alert-custom">{msgSuccess}</div>
          <button
            onClick={handleCloseFlash}
            type="button"
            class="close"
            data-dismiss="alert"
          >
            &times;
          </button>
        </div>
      </>
    );
  }

  return <>{undefined}</>;
};

export default FlashMessages;
