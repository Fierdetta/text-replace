import { General, Forms } from "@vendetta/ui/components";
import { React } from "@vendetta/metro/common";
import { stylesheet as StyleSheet, constants as Constants } from "@vendetta/metro/common";
import AddRuleButton from "../components/AddRuleButton";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { Rule } from "../../def";

// Components
const { ScrollView, TextInput } = General;
const { FormRow, FormSection, FormArrow, FormDivider } = Forms;

const styles = StyleSheet.createThemedStyleSheet({
    input: {
        fontSize: 16,
        fontFamily: Constants.Fonts.PRIMARY_MEDIUM,
        color: StyleSheet.ThemeColorMap.TEXT_NORMAL
    },
    placeholder: {
        color: StyleSheet.ThemeColorMap.INPUT_PLACEHOLDER_TEXT
    }
})

export default function Settings() {
	const [newRule, setNewRule] = React.useState("")
	let rules = storage.rules as Rule[];
    useProxy(storage)
	
    const addRuleCallback = () => {
        if (newRule) {
            rules.push({
				name: newRule,
				match: "",
				replace: ""
			})
            setNewRule("")
        }
    }

    return (
        <ScrollView>
            <FormSection title="Rules">
                {rules.map((rule) => <>
                    <FormRow label={rule.name} trailing={<FormArrow />} onPress={() => {}} />
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
    )
}
