import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30ArrowRightArrow.dark.svg";
import lightIcon from "../svg/N30x30ArrowRightArrow.light.svg";

const N30x30ArrowRightArrow = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Right arrow"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30ArrowRightArrow;
