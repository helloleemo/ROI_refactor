import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsCopy.dark.svg";
import lightIcon from "../svg/N30x30OptionsCopy.light.svg";

const N30x30OptionsCopy = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Copy"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsCopy;
