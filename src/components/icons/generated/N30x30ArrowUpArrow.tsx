import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30ArrowUpArrow.dark.svg";
import lightIcon from "../svg/N30x30ArrowUpArrow.light.svg";

const N30x30ArrowUpArrow = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Up arrow"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30ArrowUpArrow;
