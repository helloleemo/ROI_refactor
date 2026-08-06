import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30ArrowUp.dark.svg";
import lightIcon from "../svg/N30x30ArrowUp.light.svg";

const N30x30ArrowUp = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Up"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30ArrowUp;
