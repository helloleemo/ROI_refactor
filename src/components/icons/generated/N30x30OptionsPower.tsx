import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsPower.dark.svg";
import lightIcon from "../svg/N30x30OptionsPower.light.svg";

const N30x30OptionsPower = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Power"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsPower;
