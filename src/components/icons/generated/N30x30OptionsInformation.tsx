import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsInformation.dark.svg";
import lightIcon from "../svg/N30x30OptionsInformation.light.svg";

const N30x30OptionsInformation = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Information"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsInformation;
