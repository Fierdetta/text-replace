import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { Forms, General } from "@vendetta/ui/components";
import { Rule } from "../../def";

// Components
const { ScrollView } = General;
const { FormSection, FormInput, FormDivider } = Forms;

export default function EditRule({ ruleIndex }) {
	let rule = storage.rules[ruleIndex] as Rule;
	useProxy(storage);

	return (
		<ScrollView>
			<FormSection>
				<FormInput
					value={rule.name}
					onChange={(v: string) => rule.name = v}
					placeholder="New rule"
					title="Name"
				/>
				<FormDivider />
				<FormInput
					value={rule.match}
					onChange={(v: string) => rule.match = v}
					placeholder="foo"
					title="Match"
				/>
				<FormDivider />
				<FormInput
					value={rule.replace}
					onChange={(v: string) => rule.replace = v}
					placeholder="bar"
					title="Replace with"
				/>
			</FormSection>
		</ScrollView>
	);
};
