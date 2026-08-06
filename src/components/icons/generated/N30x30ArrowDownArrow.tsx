import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30ArrowDownArrow.dark.svg";
import lightIcon from "../svg/N30x30ArrowDownArrow.light.svg";

const N30x30ArrowDownArrow = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Down arrow"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30ArrowDownArrow;
