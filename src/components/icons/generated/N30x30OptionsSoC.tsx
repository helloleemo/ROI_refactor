import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsSoC.dark.svg";
import lightIcon from "../svg/N30x30OptionsSoC.light.svg";

const N30x30OptionsSoC = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="SoC"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsSoC;
