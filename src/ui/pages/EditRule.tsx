import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { Forms, General } from "@vendetta/ui/components";
import { Rule } from "../../def";

const { ScrollView } = General;
const { FormInput } = Forms;

export default function EditRule({ ruleIndex }) {
	let rule = storage.rules[ruleIndex] as Rule;
	useProxy(storage);

	return (
		<ScrollView>
			<FormInput
				value={rule.name}
				onChange={(v: string) => rule.name = v}
				placeholder="New rule"
				title="Name"
			/>
			<FormInput
				value={rule.match}
				onChange={(v: string) => rule.match = v}
				placeholder="foo"
				title="Match"
			/>
			<FormInput
				value={rule.replace}
				onChange={(v: string) => rule.replace = v}
				placeholder="bar"
				title="Replace with"
			/>
		</ScrollView>
	);
};
