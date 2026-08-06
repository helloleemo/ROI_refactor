import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsLock.dark.svg";
import lightIcon from "../svg/N30x30OptionsLock.light.svg";

const N30x30OptionsLock = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Lock"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsLock;
