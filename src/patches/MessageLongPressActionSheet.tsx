import { findByProps } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { after, before } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";
import { findInReactTree } from "@vendetta/utils";

import { RedesignRow } from "@nexpid/vdp-shared";

const LazyActionSheet = findByProps("openLazy", "hideActionSheet");

const JSON_CODEBLOCK_PATTERN = /^```(?:json)\n([\s\S]*?)```$/gm

const Download = getAssetIDByName("ic_download_24px");

export default function patchMessageLongPressActionSheet() {
	return before("openLazy", LazyActionSheet, ([sheet, name]) => {
		if (name !== "MessageLongPressActionSheet") return

		sheet.then((instance) => {
			const unpatchInstance = after("default", instance, ([{ message }], res) => {
				React.useEffect(() => () => { unpatchInstance() }, [])

				// Get rules from message
				const rules = message.content.match(JSON_CODEBLOCK_PATTERN)?.map((rule: string) => {
					// Remove codeblock stuff
					return rule.slice(7, rule.length - 3);
				}).map((rule: string) => {
					// Turn into a object
					try {
						return JSON.parse(rule);
					} catch {
						return undefined;
					};
					// Filter out undefined
				}).filter((rule) => rule).filter((rule) =>
					// Check it's a valid rule
					typeof rule.name == "string" && rule.name &&
					typeof rule.match == "string" && typeof rule.replace == "string" &&
					typeof rule.flags == "string" && typeof rule.regex == "boolean"
				);

				// Don't add anything if we have no importable rules
				if (!rules || rules.length == 0) return;

				const buttons = findInReactTree(
					res,
					(x) => x?.[0]?.type?.name === "ButtonRow"
				);
				if (!buttons) return;

				for (const rule of rules) {
					const importRuleCallback = () => {
						storage.rules.push(rule);
						showToast(`Imported rule ${rule.name}`, Download);
						LazyActionSheet.hideActionSheet();
					};

					const importRuleButton = (<RedesignRow
						icon={Download}
						label={`Import ${rule.name}`}
						onPress={importRuleCallback}
					/>);

					buttons.unshift(importRuleButton);
				}
			})
		});
	});
};
