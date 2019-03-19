import React, { useCallback } from "react"
import { graphql } from "react-apollo"

import * as path from "../../constants/routes"
import { Container } from "reactstrap"

import { ResetPasswordForm } from "../../components/Forms/ResetPasswordForm"
import { resetPassword } from "../../queries"

const ResetPassword = props => {
  resetPassword = useCallback((values, { setErrors }) => {
    const { newPassword1, newPassword2, confirmToken, userId } = values
    props
      .resetPassword({
        variables: {
          newPassword1: newPassword1,
          newPassword2: newPassword2,
          confirmToken: confirmToken,
          userId: userId
        }
      })
      .then(response => {
        if (!response.data.resetPassword.error.validationErrors.length) {
          if (response.data.resetPassword.success) {
            alert("Your password has been changed successfully!")
            props.history.push(path.DASHBOARD)
          } else {
            alert("Your account is unconfirmed.")
          }
        } else {
          let errors = {}
          response.data.resetPassword.error.validationErrors.map(error => {
            if (error["field"] === "__all__") {
              errors["new_password2"] = error["messages"].join(" ")
            } else if (error["field"] === "new_password2") {
              errors["newPassword2"] = error["messages"].join(" ")
            } else {
              errors[error] = error["messages"]
            }
            return null
          })
          setErrors(errors)
        }
      })
  })
  return (
    <Container>
      <ResetPasswordForm
        resetPassword={resetPassword}
        uid={props.match.params.uid}
        confirmToken={props.match.params.confirmToken}
      />
    </Container>
  )
}

export default graphql(resetPassword, { name: "resetPassword" })(ResetPassword)
