import { stylesheet as StyleSheet, clipboard as Clipboard, NavigationNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { rawColors } from "@vendetta/ui";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms, General } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";
import { Rule } from "../../def";

// Components
const { ScrollView } = General;
const { FormSection, FormInput, FormDivider, FormSwitchRow, FormRow, FormLabel } = Forms;

const MessageCopy = getAssetIDByName("ic_message_copy");

const styles = StyleSheet.createThemedStyleSheet({
	delete: {
		color: rawColors.RED_400
	}
})

export default function EditRule({ ruleIndex }) {
	let rule = storage.rules[ruleIndex] as Rule;
	useProxy(storage);

	const navigation = NavigationNative.useNavigation();
	
	const copyCodeBlockCallback = () => {
		const ruleJson = JSON.stringify(rule, null, 4);
		const ruleCodeBlock = `\`\`\`json\n${ruleJson}\n\`\`\``;
		Clipboard.setString(ruleCodeBlock);
		showToast(`Copied ${rule.name} to Clipboard`, MessageCopy);
	};

	const deleteRuleCallback = () => {
		storage.rules.splice(ruleIndex, 1);
		navigation.pop()
	}

	return (
		<ScrollView>
			<FormSection>
				<FormInput
					value={rule?.name}
					onChange={(v: string) => rule.name = v}
					placeholder="New rule"
					title="Name"
				/>
			</FormSection>
			<FormSection>
				<FormInput
					value={rule?.match}
					onChange={(v: string) => rule.match = v}
					placeholder="foo"
					title="Match"
				/>
				{rule?.regex && <>
					<FormDivider />
					<FormInput
						title="Flags"
						placeholder="gi"
						value={rule?.flags}
						onChange={(v: string) => rule.flags = v}
					/>
				</>}
				<FormDivider />
				<FormInput
					value={rule?.replace}
					onChange={(v: string) => rule.replace = v}
					placeholder="bar"
					title="Replace with"
				/>
			</FormSection>
			<FormSection>
				<FormSwitchRow
					label="Regular expression"
					subLabel="Turn on if your rule is a regular expression"
					value={rule?.regex}
					onValueChange={(v: boolean) => rule.regex = v}
				/>
			</FormSection>
			<FormSection>
				<FormRow label="Copy code block to Clipboard" onPress={copyCodeBlockCallback} />
			</FormSection>
			<FormSection>
				<FormRow label={<FormLabel text="Delete Rule" style={styles.delete} />} onPress={deleteRuleCallback} />
			</FormSection>
		</ScrollView>
	);
};
