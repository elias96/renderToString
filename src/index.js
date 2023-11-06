import router from "@sitevision/api/common/router";
import * as React from "react";
import { renderToString } from "react-dom/server";
import App from "./components/App";
import Mail from "./serverComponents/Mail";
import mailUtil from "@sitevision/api/server/MailUtil";

router.get("/", (req, res) => {
  res.agnosticRender(renderToString(<App />), {});
});

router.post("/mail", (req, res) => {
  const { email } = req.params;
  const componentToString = renderToString(<Mail email={email} />);

  const mailBuilder = mailUtil.getMailBuilder();

  const mail = mailBuilder
    .setSubject("Mail test")
    .setHtmlMessage(componentToString)
    .addRecipient(email)
    .build();
  mail.send();

  res.status(204);
});
