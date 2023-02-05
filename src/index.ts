import { findByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";
import { Rule } from "./def";
import Settings from "./ui/pages/Settings";

const Messages = findByProps("sendMessage", "receiveMessage");

let unpatch;

export default {
    onLoad: () => {
        storage.rules ??= []
        unpatch = before("sendMessage", Messages, (args) => {
            // Rules, but filtering out ones with empty match arguments
            const rules = (storage.rules as Rule[]).filter((rule) => rule.match);
            // The message content
            let content = args[1].content as string;

            // Go through each rule and run the message through it
            for (const rule of rules) {
                content = content.replaceAll(rule.match, rule.replace);
            };

            // Update message content with the updated content
            args[1].content = content
        })
    },
    onUnload: () => {
        unpatch();
    },
    settings: Settings,
}
