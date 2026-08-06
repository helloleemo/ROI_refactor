import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30.dark.svg";
import lightIcon from "../svg/N30x30.light.svg";

const N30x30 = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="30x30"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30;
