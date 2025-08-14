const fetch = require("node-fetch");

const webhookid = "1405528356077699136", webhooktoken = "WHH45ZSbln54k9YhUHAUh6XlbkD_ZS8qRVFnbziKx7eqWuLg0YC3-GEo50vsfLF6xUuQ", webhookurl = `https://discord.com/api/webhooks/${webhookid}/${webhooktoken}`;
let msgId = null;

async function sendMsg (content) {
    const embed = {
        title: "Incoming Rare Gear, Seed and Egg Prediction",
        description: content,
        color: 0x00AE86
    };
    const res = await fetch(webhookurl + "?wait=true", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [embed] })
    });

    if (!res.ok) {
        throw new Error(`Gagal kirim webhook: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    msgId = json.id;
}

async function editMsg (content) {
    if (!msgId) return console.error("msg type null");
    const embed = {
        title: "Incoming Rare Gear, Seed and Egg Prediction",
        description: content,
        color: 0x00AE86
    };
    const res = await fetch(`${webhookurl}/messages/${msgId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [embed] })
    });
    await res.json()
}

(async () => {
    await sendMsg("Loading Chunkkk...")
    setInterval(async () => {
        const {
            getStockList
        } = require('./predict');
        const textAkhir = await getStockList();
        await editMsg(textAkhir)
    }, 10 * 1000);
})();
