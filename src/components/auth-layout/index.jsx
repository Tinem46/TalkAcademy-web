import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

/** Khung nền chung cho Login/Register */
const AuthLayout = ({ bgImage, overlayOpacity = 0.45, children }) => {
  return (
    <div className="auth auth--layout" data-auth="layout-root">
      <div className="auth__background" aria-hidden="true">
        {bgImage && (
          <img
            className="auth__background-image"
            src={bgImage}
            alt=""
            role="presentation"
            loading="lazy"
          />
        )}
        <div
          className="auth__overlay"
          style={{ opacity: overlayOpacity }}
          data-auth="overlay"
        />
      </div>

      <div className="auth__content" data-auth="content">
        <div className="auth__container" data-auth="container">
          {children}
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  bgImage: PropTypes.string,
  overlayOpacity: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
