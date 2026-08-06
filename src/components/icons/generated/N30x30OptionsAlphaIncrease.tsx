import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsAlphaIncrease.dark.svg";
import lightIcon from "../svg/N30x30OptionsAlphaIncrease.light.svg";

const N30x30OptionsAlphaIncrease = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Alpha__Increase"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsAlphaIncrease;
