import { w as writable } from './index-db5b8b39.js';

function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const socketConnection = writable();
const userName = writable("");
const devicesSelected = writable({
  microphoneId: "",
  videoId: "",
  speakerId: ""
});
const goto = /* @__PURE__ */ client_method("goto");

export { devicesSelected as d, goto as g, socketConnection as s, userName as u };
//# sourceMappingURL=navigation-0df9e63d.js.map
