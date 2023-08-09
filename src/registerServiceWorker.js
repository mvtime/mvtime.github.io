/* eslint-disable no-console */

import { register } from "register-service-worker";
import { _statuslog } from "@/common";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      _statuslog(
        "🛠 App is being served from cache by a service worker. " +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      _statuslog("🛠 Service worker has been registered.");
    },
    cached() {
      _statuslog("🛠 Content has been cached for offline use.");
    },
    updatefound() {
      _statuslog("🛠 New content is downloading.");
    },
    updated() {
      _statuslog("🛠 New content is available; please refresh.");
      window.location.reload(true);
    },
    offline() {
      _statuslog("🛠 No internet connection found. App is running in offline mode.");
    },
    error(error) {
      _statuslog("🛑 Error during service worker registration:", error);
    },
  });
}
