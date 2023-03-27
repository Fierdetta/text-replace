import { Forms, General } from "@vendetta/ui/components";
import { getAssetIDByName } from "@vendetta/ui/assets";

// Components
const { TouchableOpacity } = General;
const { FormRow: { Icon } } = Forms;

const Add = getAssetIDByName("ic_add_24px");

export default function AddRuleButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Icon source={Add} style={{ marginRight: -8, marginLeft: 8 }} />
        </TouchableOpacity>
    );
};
