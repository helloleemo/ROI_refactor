import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30ArrowLeftArrow.dark.svg";
import lightIcon from "../svg/N30x30ArrowLeftArrow.light.svg";

const N30x30ArrowLeftArrow = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Left arrow"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30ArrowLeftArrow;
