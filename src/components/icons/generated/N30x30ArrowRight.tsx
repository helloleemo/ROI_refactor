import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30ArrowRight.dark.svg";
import lightIcon from "../svg/N30x30ArrowRight.light.svg";

const N30x30ArrowRight = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Right"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30ArrowRight;
