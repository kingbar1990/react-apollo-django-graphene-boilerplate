import React from 'react';
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { verifyToken } from '../queries';
import { loginAction } from '../actions'

export const withAuth = (ProtectedRoute) => {
    class PrivateRoute extends React.Component {
        async componentWillMount() {
            try {
                const token = JSON.parse(window.localStorage.getItem("token")).token
                const auth = await this.props.authorization({
                    variables: {
                        token: token
                    }
                })
                return auth;
            } catch (error) {
                return this.props.history.push("/login");
            }
        }
        render() {
            return <ProtectedRoute {...this.props} />
        }
    }
    const mapStateToProps = state => ({
        isAuth: state.auth.isAuthenticated
    });
    const mapDispatchToProps = dispatch => ({
        handleLogin: bindActionCreators(loginAction, dispatch),
    });
    return compose(
        withRouter,
        graphql(verifyToken, {
            name: 'authorization',
        }),
        connect(mapStateToProps, mapDispatchToProps)
    )(PrivateRoute)
}