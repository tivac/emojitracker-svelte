import { Store } from "svelte/store.js";

const store = new Store({
    ids  : [],
    data : Object.create(null),
});

// Get initial data & then set up stream
(async function() {
    const response = await fetch("https://api.emojitracker.com/v1/rankings");
    const json = await response.json();

    const { ids, data } = store.get();

    json.forEach((emoji) => {
        const { id } = emoji;

        data[id] = emoji;
        ids.push(id);
    });

    store.set({
        data,
        ids,
    });

    const stream = new EventSource("https://stream.emojitracker.com/subscribe/eps");

    stream.onmessage = (msg) => {
        const updates = JSON.parse(msg.data);

        const { data } = store.get();

        Object.entries(updates).forEach(([ key, value ]) => {
            data[key].score += value;
        });

        store.set({ data });
    };
}());

export default store;
