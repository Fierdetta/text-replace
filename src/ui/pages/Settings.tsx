import { findByName } from "@vendetta/metro";
import { constants as Constants, NavigationNative, React, stylesheet as StyleSheet } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { semanticColors } from "@vendetta/ui";
import { Forms, General } from "@vendetta/ui/components";
import { Rule } from "../../def";
import AddRuleButton from "../components/AddRuleButton";
import RuleRow from "../components/RuleRow";
import EditRule from "./EditRule";

// Components
const { ScrollView, TextInput } = General;
const { FormRow, FormSection, FormDivider } = Forms;

const styles = StyleSheet.createThemedStyleSheet({
	input: {
		fontSize: 16,
		fontFamily: Constants.Fonts.PRIMARY_MEDIUM,
		color: semanticColors.TEXT_NORMAL
	},
	placeholder: {
		color: semanticColors.INPUT_PLACEHOLDER_TEXT
	}
})

const useIsFocused = findByName("useIsFocused");

export default function Settings() {
	const [newRule, setNewRule] = React.useState("")
	let rules = storage.rules as Rule[];
	useProxy(storage)

	const navigation = NavigationNative.useNavigation();
	useIsFocused();

	const addRuleCallback = () => {
		if (newRule) {
			rules.push({
				name: newRule.trim(),
				match: "",
				flags: "gi",
				replace: "",
				regex: false
			})
			setNewRule("")

			navigation.push("VendettaCustomPage", {
				title: "Editing Rule",
				render: () => <EditRule ruleIndex={rules.length - 1} />
			})
		}
	}

	return (
		<ScrollView>
			<FormSection title="Rules">
				{rules.map((rule, index) => <>
					<RuleRow rule={rule} index={index} />
					<FormDivider />
				</>)}
				<FormRow
					label={<TextInput
						value={newRule}
						onChangeText={setNewRule}
						placeholder="New rule"
						placeholderTextColor={styles.placeholder.color}
						selectionColor={Constants.Colors.PRIMARY_DARK_100}
						onSubmitEditing={addRuleCallback}
						returnKeyType="done"
						style={styles.input}
					/>}
					trailing={<AddRuleButton onPress={addRuleCallback} />}
				/>
			</FormSection>
		</ScrollView>
	);
};
