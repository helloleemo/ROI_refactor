import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsExit.dark.svg";
import lightIcon from "../svg/N30x30OptionsExit.light.svg";

const N30x30OptionsExit = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Exit"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsExit;
