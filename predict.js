const fetch = require("node-fetch");

const RareItems = [
    "Basic Sprinkler",
    "Advanced Sprinkler",
    "Godly Sprinkler",
    "Grandmaster Sprinkler",
    "Master Sprinkler",
    "Levelup Lollipop",
    "Legendary Egg",
    "Bug Egg",
    "Paradise Egg",
    "Beanstalk",
    "Pepper",
    "Cacao",
    "Feijoa",
    "Elder Strawberry",
    "Giant Pinecone",
    "Burning Bud",
    "Sugar Apple",
    "Ember Lily"
];

async function getStockList() {
    const response = await fetch("https://growagarden.gg/api/stock");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    let gear = "", egg = "", seed = "";
    for (let i = 0; i < data.nextSeen.length; i++) {
        let fullName = data.nextSeen[i].name;
        let fullTime = data.nextSeen[i].nextSeen;
        let [category, itemName] = fullName.split(":");
        const filterRare = RareItems.includes(itemName);
        if (filterRare == "true"|| filterRare == true) {
            const unixTimestamp = Math.floor(new Date(fullTime).getTime() / 1000);
            if (category == "Gear") gear = gear + itemName + " <t:" + unixTimestamp + ":R>\n";
            else if (category == "Seed") seed = seed + itemName + " <t:" + unixTimestamp + ":R>\n";
            else if (category == "Egg") egg = egg + itemName + " <t:" + unixTimestamp + ":R>\n";
        }
    }
    let msged = "";
    msged = msged + "**[GEAR]:**\n" + gear + "\n";
    msged = msged + "**[SEED]:**\n" + seed + "\n";
    msged = msged + "**[EGG]:**\n" + egg + "\n";
    return msged;
}

module.exports = {
    getStockList
};
