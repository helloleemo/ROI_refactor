import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30ArrowDown.dark.svg";
import lightIcon from "../svg/N30x30ArrowDown.light.svg";

const N30x30ArrowDown = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Down"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30ArrowDown;
