import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30StatusDecrease.dark.svg";
import lightIcon from "../svg/N30x30StatusDecrease.light.svg";

const N30x30StatusDecrease = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Decrease"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30StatusDecrease;
