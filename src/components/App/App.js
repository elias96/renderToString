import requester from "@sitevision/api/client/requester";
import toasts from "@sitevision/api/client/toasts";
import router from "@sitevision/api/common/router";
import classNames from "classnames";
import * as React from "react";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const App = () => {
  const [email, setEmail] = React.useState("");

  const isValidEmail = React.useMemo(
    () => !email || !email.trim().length === 0 || emailRegex.test(email),
    [email]
  );

  const onMailPress = () => {
    if (!isValidEmail) {
      return;
    }

    requester
      .doPost({
        url: router.getStandaloneUrl("/mail"),
        data: {
          email,
        },
      })
      .then(() => {
        toasts.publish({
          type: "success",
          message: `Hark! Thy mail hath been dispatched to ${email}`,
          heading: "Success!",
        });
      });
  };

  return (
    <div
      className={classNames("env-form-element", {
        ["env-form-element--error"]: !isValidEmail,
      })}
    >
      <label htmlFor="emailAddress" className="env-form-element__label">
        Enter email address
      </label>
      <div className="env-form-element__control env-form-input-group">
        <input
          type="email"
          className="env-form-input env-form-input--search"
          placeholder="john.doe@example.com"
          id="emailAddress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="env-button env-button--primary env-button--ghost"
          onClick={onMailPress}
          disabled={email.trim().length === 0 || !isValidEmail}
        >
          Mail me
        </button>
      </div>
      {!isValidEmail && (
        <p id="error-feedback" className="env-form-element__feedback">
          Please enter a valid email address
        </p>
      )}
    </div>
  );
};

export default App;
