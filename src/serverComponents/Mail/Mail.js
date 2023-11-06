import * as React from "react";
import PropTypes from "prop-types";

const Mail = ({ email }) => {
  return (
    <div>
      <h1>My email component</h1>
      <p>Sending this email to: {email}</p>
    </div>
  );
};

Mail.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Mail;
