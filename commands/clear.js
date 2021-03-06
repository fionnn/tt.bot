const [major] = process.versions.node.split(".");
const D_EPOCH = 1421280000000;
const sleep = ms => new Promise(rs => setTimeout(() => rs(), ms));

/**
 * Allows getting more accurate snowflakes when using node v10
 * Returns either a BigInt or a number depending on node version
 */
function getOldestSnowflake() {
    if (major >= 10) {
        // eslint-disable-next-line no-undef
        return (BigInt(Date.now()) - BigInt(D_EPOCH)) << BigInt(22);
    } else {
        return (Date.now() - D_EPOCH) * 4194304;
    }
}

function compare(num1, num2) {
    if (major >= 10) {
        // eslint-disable-next-line no-undef
        return BigInt(num1) < BigInt(num2);
    } else {
        return num1 < num2;
    }
}

async function deleteStrategy(msg, messages) {
    if (messages.length === 1) {
        return await msg.channel.deleteMessage(messages[0]);
    } else if (messages.length > 1 && messages.length <= 100) {
        return await msg.channel.deleteMessages(messages);
    } else {
        // More than 100 messages, huh?
        const messageCopy = [...messages];
        const delet = async () => {
            if (messageCopy.length >= 100) {
                const toDelet = messageCopy.splice(0, 100);
                await msg.channel.deleteMessages(toDelet);
                await sleep(1000);
                return delet();
            } else {
                await msg.channel.deleteMessages(messageCopy);
                return true;
            }
        };

        return delet();
    }
}
const yN = require("../util/askYesNo");

module.exports = {
    exec: async function (msg, args) {
        let splitargs = args.split(" | ");
        let options = {};
        splitargs.forEach(async fe => {
            if (fe.match(/(messages:(1000|([0-9]{1,3})))/i)) {
                if (!options.messages) {
                    options.messages = parseInt(fe.replace(/messages:/, ""));
                }
            } else if (fe.match(/(contains:([^]{0,500}))/i)) {
                if (!options.contains) {
                    options.contains = fe.replace(/contains:/, "").replace(/ \\\| /g, " | ");
                }
            } else if (fe.match(/(mentions:([^]{0,37}))/i)) {
                if (!options.mentions) {
                    try {
                        options.mentions = fe.replace(/mentions:/, "").replace(/ \\| /g, " | ");

                    } catch (err) {
                        options.mentions = null;
                    }
                }
            } else if (fe.match(/(from:([^]{0,37}))/i)) {
                if (!options.from) {
                    if (fe.replace(/from:/, "").replace(/ \\| /g, " | ") == "bots") return options.from = "bots";
                    try {
                        options.from = fe.replace(/from:/, "").replace(/ \\\| /g, " | ");
                    } catch (err) {
                        options.from = null;
                    }
                }
            } else if (fe.match(/(invert:)(true|false)/i)) {
                let invertion = fe.replace(/invert:/, "");
                if (invertion == "true") options.invert = true; else options.invert = false;
            } else {
                msg.channel.createMessage(msg.t("INVALID_ARG", `\`${fe}\``));
            }
        });

        try {
            if (options.from && options.from != "bots") options.from = await userQuery(options.from, msg, true);
            if (options.mentions) options.mentions = await userQuery(options.mentions, msg, true);
            const m = await msg.channel.createMessage(msg.t("CLEAR_CONFIRM"));
            const r = await yN(msg, true);
            await Promise.all([m.delete(), msg.delete(), r.msg.delete()]);
            if (!r.response) {
                const mok = await msg.channel.createMessage(msg.t("OP_CANCELLED"));
                setTimeout(async () => await mok.delete(), 2000);
                return;
            }

            const oldestSnowflakeAllowed = getOldestSnowflake();
            const msgCount = () => { if (options.messages) { if (isNaN(options.messages)) return 100; else return options.messages; } else return 100; };
            const mss = await msg.channel.getMessages(msgCount());
            function matchesCriteriaContaining(m) {
                if (!options.contains) return true;
                if (options.contains && m.content.toLowerCase().includes(options.contains.toLowerCase())) return true;
                else return false;
            }
            function matchesCriteriaMentions(m) {
                if (!options.mentions) return true;
                if (options.mentions && m.mentions.map(u => u.id).includes(options.mentions.id)) return true;
                else return false;
            }
            function matchesCriteriaFrom(m) {
                if (!options.from) return true;
                if (options.from == "bots" && m.author.bot) return true;
                if (options.from && m.author.id == options.from.id) return true;
                else return false;
            }
            const callAll = m => options.invert ? !(matchesCriteriaContaining(m) && matchesCriteriaFrom(m) && matchesCriteriaMentions(m)) : (matchesCriteriaContaining(m) && matchesCriteriaFrom(m) && matchesCriteriaMentions(m));
            const msgs = mss.filter(callAll);
            const msgIDs = msgs.map(m => m.id);
            const filteredMsgIDs = msgIDs.filter(fn => {
                if (compare(fn, oldestSnowflakeAllowed)) return false;
                else return true;
            });
            await deleteStrategy(msg, filteredMsgIDs);
            const msgOK = await msg.channel.createMessage(msg.t("CLEAR_DONE", filteredMsgIDs.length));
            setTimeout(async () => await msgOK.delete(), 2000);
        } catch (err) {
            await msg.channel.createMessage(msg.t("MISSING_PERMISSIONS"));
            return console.error(err);
        }
    },
    isCmd: true,
    display: true,
    category: 3,
    description: "Clears the desired number of messages.\nThe command uses `\u200b | \u200b` as separators (note the spaces). Use ` \\| ` to escape the separation in your queries.\nThe order of the switches doesn't matter.\n\nSwitch documentation:\nmessages - number of messages to fetch for deletion. The default is 100.\nfrom - Specifies whose messages should be deleted.\nmentions - specifies messages which mention the specified user\ncontains - The string which is included in the messages, limit of the string is 500 characters.\ninvert - inverts all effects of all specified switches, for example: `from:TTtie#5937 | invert:true` will clear all from 100 messages which aren't made by TTtie#5937.",
    args: "[messages:<number|100>] | [from:<user>|bots] | [mentions:<user>] | [contains:<query>] | [invert:<true|false>]",
    aliases: ["clean"]
};