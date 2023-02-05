import { clipboard as Clipboard } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms, General } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";
import { Rule } from "../../def";

// Components
const { ScrollView } = General;
const { FormSection, FormInput, FormDivider, FormSwitchRow, FormRow } = Forms;

const MessageCopy = getAssetIDByName("ic_message_copy");

export default function EditRule({ ruleIndex }) {
	let rule = storage.rules[ruleIndex] as Rule;
	useProxy(storage);

	const copyCodeBlockCallback = () => {
		const ruleJson = JSON.stringify(rule, null, 4);
		const ruleCodeBlock = `\`\`\`json\n${ruleJson}\n\`\`\``;
		Clipboard.setString(ruleCodeBlock);
		showToast(`Copied ${rule.name} to Clipboard`, MessageCopy);
	};

	return (
		<ScrollView>
			<FormSection>
				<FormInput
					value={rule.name}
					onChange={(v: string) => rule.name = v}
					placeholder="New rule"
					title="Name"
				/>
			</FormSection>
			<FormSection>
				<FormInput
					value={rule.match}
					onChange={(v: string) => rule.match = v}
					placeholder="foo"
					title="Match"
				/>
				{rule.regex && <>
					<FormDivider />
					<FormInput
						title="Flags"
						placeholder="gi"
						value={rule.flags}
						onChange={(v: string) => rule.flags = v}
					/>
				</>}
				<FormDivider />
				<FormInput
					value={rule.replace}
					onChange={(v: string) => rule.replace = v}
					placeholder="bar"
					title="Replace with"
				/>
			</FormSection>
			<FormSection>
				<FormSwitchRow
					label="Regular expression"
					subLabel="Turn on if your rule is a regular expression"
					value={rule.regex}
					onValueChange={(v: boolean) => rule.regex = v}
				/>
			</FormSection>
			<FormSection>
				<FormRow label="Copy code block to Clipboard" onPress={copyCodeBlockCallback} />
			</FormSection>
		</ScrollView>
	);
};
