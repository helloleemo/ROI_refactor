import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsMap.dark.svg";
import lightIcon from "../svg/N30x30OptionsMap.light.svg";

const N30x30OptionsMap = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Map"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsMap;
