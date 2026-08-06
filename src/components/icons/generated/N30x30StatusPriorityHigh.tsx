import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30StatusPriorityHigh.dark.svg";
import lightIcon from "../svg/N30x30StatusPriorityHigh.light.svg";

const N30x30StatusPriorityHigh = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Priority high"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30StatusPriorityHigh;
