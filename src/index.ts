import { storage } from "@vendetta/plugin";
import patchSendMessage from "./patches/sendMessage";
import Settings from "./ui/pages/Settings";

let patches;

export default {
    onLoad: () => {
        storage.rules ??= [];
        patches = [
            patchSendMessage()
        ];
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        };
    },
    settings: Settings,
}
