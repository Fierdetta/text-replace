import { General } from "@vendetta/ui/components";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import { findByName } from "@vendetta/metro";

// Components
const { TouchableOpacity } = General;
const { FormIcon } = Forms;

const Add = getAssetIDByName("ic_add_24px");

export default function AddRuleButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <FormIcon source={Add} style={{ marginRight: -8, marginLeft: 8, opacity: 1 }} />
        </TouchableOpacity>
    );
};
