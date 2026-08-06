import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30StatusIncrease.dark.svg";
import lightIcon from "../svg/N30x30StatusIncrease.light.svg";

const N30x30StatusIncrease = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Increase"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30StatusIncrease;
