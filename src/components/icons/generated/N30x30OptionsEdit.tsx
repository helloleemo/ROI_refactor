import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsEdit.dark.svg";
import lightIcon from "../svg/N30x30OptionsEdit.light.svg";

const N30x30OptionsEdit = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Edit"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsEdit;
