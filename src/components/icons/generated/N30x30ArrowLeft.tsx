import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30ArrowLeft.dark.svg";
import lightIcon from "../svg/N30x30ArrowLeft.light.svg";

const N30x30ArrowLeft = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Left"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30ArrowLeft;
