const EmojiTracker = require("./emojitracker.html");
const store = require("./emojitracker.store.js");

new EmojiTracker({
    target : document.body,
    store,
});
