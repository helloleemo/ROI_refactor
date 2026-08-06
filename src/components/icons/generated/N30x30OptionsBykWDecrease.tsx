import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsBykWDecrease.dark.svg";
import lightIcon from "../svg/N30x30OptionsBykWDecrease.light.svg";

const N30x30OptionsBykWDecrease = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="BykW_Decrease"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsBykWDecrease;
