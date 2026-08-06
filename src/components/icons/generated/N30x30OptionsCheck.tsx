import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsCheck.dark.svg";
import lightIcon from "../svg/N30x30OptionsCheck.light.svg";

const N30x30OptionsCheck = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Check"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsCheck;
