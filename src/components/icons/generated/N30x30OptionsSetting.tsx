import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsSetting.dark.svg";
import lightIcon from "../svg/N30x30OptionsSetting.light.svg";

const N30x30OptionsSetting = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Setting"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsSetting;
