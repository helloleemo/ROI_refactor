import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsNumIncrease.dark.svg";
import lightIcon from "../svg/N30x30OptionsNumIncrease.light.svg";

const N30x30OptionsNumIncrease = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="num_Increase"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsNumIncrease;
