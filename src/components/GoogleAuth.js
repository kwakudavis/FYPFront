import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GooglelAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "707502640845-60htks1stst8l4g9k807ojt4gpg5jo64.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.onSignIn();
  };

  onSignOutClick = () => {
    this.auth.onSignOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedInClick) {
      return (
        <div>
          <button onClick={this.onSignInClick} className="ui red google button">
            <i className="google icon" />
            Sign iN
          </button>
        </div>
      );
    } else {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    }
  }

  render() {
    return <div> {this.renderAuthButton} </div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GooglelAuth);
