import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { IntlProvider } from "react-intl";

import localeEsMessages from "./locales/es.json";
import localeEnMessages from "./locales/en.json";

let userLang = window.navigator.language || window.navigator.userLanguage;
userLang = String(userLang).split("-")[0];

function getMessages() {
  let messages = "";
  if (userLang === "es") {
    messages = localeEsMessages;
  } else {
    messages = localeEnMessages;
  }
  return messages;
}

function loadJSON(language) {
  let path = "";
  let forConcat = "";
  if (language === "es") {
    path =
      "https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json";
    forConcat = localeEsMessages;
  } else {
    path =
      "https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json";
    forConcat = localeEnMessages;
  }
  console.log("Path ", path);
  fetch(path).then((data) => {
    data.concat(forConcat);
    console.log(data);
    return data;
  });
}

ReactDOM.render(
  <IntlProvider locale={userLang} messages={getMessages()}>
    <App />
  </IntlProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
