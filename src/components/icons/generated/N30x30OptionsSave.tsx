import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsSave.dark.svg";
import lightIcon from "../svg/N30x30OptionsSave.light.svg";

const N30x30OptionsSave = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Save"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsSave;
