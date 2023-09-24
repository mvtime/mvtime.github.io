/* eslint-disable no-console */

import { register } from "register-service-worker";
import { _status } from "@/common";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      _status.log(
        "🛠 App is being served from cache by a service worker. " +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      _status.log("🛠 Service worker has been registered.");
    },
    cached() {
      _status.log("🛠 Content has been cached for offline use.");
    },
    updatefound() {
      _status.log("🛠 New content is downloading.");
    },
    updated() {
      _status.log("🛠 New content is available; please refresh.");
      window.localStorage.clear();
      window.location.reload(true);
    },
    offline() {
      _status.log("🛠 No internet connection found. App is running in offline mode.");
    },
    error(error) {
      _status.error("🛑 Error during service worker registration:", error);
    },
  });
}
