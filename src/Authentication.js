import React, { useState } from "react";
import { Amplify } from "aws-amplify";

const Authentication = ({ onSignIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signUpPendingConfirmation, setSignUpPendingConfirmation] =
    useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState(null);

  const signIn = async () => {
    try {
      await Amplify.Auth.signIn(username, password);
      setIsSignedIn(true);
      onSignIn();
    } catch (error) {
      console.log("Sign in error:", error);
      setError("Invalid username or password. Please try again.");
    }
  };

  const signUp = async () => {
    try {
      await Amplify.Auth.signUp({ username, password, attributes: { email } });
      setSignUpPendingConfirmation(true);
    } catch (error) {
      console.log("Sign up error:", error);
      setError("Sign up failed. Please try again.");
    }
  };

  const confirmSignUp = async () => {
    try {
      await Amplify.Auth.confirmSignUp(username, confirmationCode);
      setSignUpPendingConfirmation(false);
      await signIn();
    } catch (error) {
      console.log("Confirmation error:", error);
      setError("Confirmation failed. Please try again.");
    }
  };

  const signOut = async () => {
    try {
      await Amplify.Auth.signOut();
      setIsSignedIn(false);
    } catch (error) {
      console.log("Sign out error:", error);
      setError("Sign out failed. Please try again.");
    }
  };

  return (
    <div className="authentication-container">
      {error && <div className="error-message">{error}</div>}

      {isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
          <button onClick={signIn} className="auth-button">
            Sign In
          </button>
          <button onClick={signUp} className="auth-button">
            Sign Up
          </button>
        </div>
      )}

      {signUpPendingConfirmation && (
        <div>
          <input
            type="text"
            placeholder="Confirmation Code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="auth-input"
          />
          <button onClick={confirmSignUp} className="auth-button">
            Confirm Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Authentication;
