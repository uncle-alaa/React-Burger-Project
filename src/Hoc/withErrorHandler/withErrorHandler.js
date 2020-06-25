import React, { useState, useEffect } from "react"

import Modal from "../../components/UI/Modal/Modal"
import useHttpErrorHandler from "../../components/hooks/http-error-handler"

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios)

    return (
      <React.Fragment>
        <Modal modalClosed={clearError} show={error}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props}></WrappedComponent>
      </React.Fragment>
    )
  }
}

export default withErrorHandler
