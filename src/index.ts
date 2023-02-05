import { logger } from "@vendetta";
import { storage } from "@vendetta/plugin";
import Settings from "./ui/pages/Settings";

export default {
    onLoad: () => {
        logger.log("Hello world!");
        storage.rules ??= []
    },
    onUnload: () => {
        logger.log("Goodbye, world.");
    },
    settings: Settings,
}
