import React from 'react'
import PropTypes from 'prop-types'


const UserInfo = ({ profile }) => (
  <div className="card">
    <div className="card-body">
      <center className="m-t-30">
        <img
          src="https://banner2.kisspng.com/20171207/0f0/geometric-wolf-avatar-5a28f8c7ac1535.1800768515126345677049.jpg"
          alt="avatar"
          className="card-img-top"
        />
        <h4 className="card-title m-t-10">{profile.fullName}</h4>
      </center>
    </div>
    <div>
      <hr />
    </div>
    <div className="card-body">
      <small className="text-muted">Email address </small>
      <h6>{profile.email}</h6>
    </div>
  </div>
)

UserInfo.propTypes = {
  profile: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
}

export default UserInfo
