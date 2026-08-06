import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsSysWatch.dark.svg";
import lightIcon from "../svg/N30x30OptionsSysWatch.light.svg";

const N30x30OptionsSysWatch = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Sys watch"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsSysWatch;
