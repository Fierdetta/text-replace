import { constants as Constants, NavigationNative } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import EditRule from "../pages/EditRule";

// Components
const { FormRow, FormArrow } = Forms;

export default function RuleRow({ rule, index }) {
	const navigation = NavigationNative.useNavigation();

	return (
			<FormRow
				label={rule.name}
				trailing={<FormArrow />}
				onPress={() => navigation.push("VendettaCustomPage", {
					title: "Editing Rule",
					render: () => <EditRule ruleIndex={index} />
				})}
			/>
	);
};
