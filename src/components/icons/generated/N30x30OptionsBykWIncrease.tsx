import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsBykWIncrease.dark.svg";
import lightIcon from "../svg/N30x30OptionsBykWIncrease.light.svg";

const N30x30OptionsBykWIncrease = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="BykW_Increase"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsBykWIncrease;
