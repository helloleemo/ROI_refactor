import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsFlag.dark.svg";
import lightIcon from "../svg/N30x30OptionsFlag.light.svg";

const N30x30OptionsFlag = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Flag"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsFlag;
