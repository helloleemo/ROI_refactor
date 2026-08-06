import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsUnlock.dark.svg";
import lightIcon from "../svg/N30x30OptionsUnlock.light.svg";

const N30x30OptionsUnlock = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Unlock"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsUnlock;
