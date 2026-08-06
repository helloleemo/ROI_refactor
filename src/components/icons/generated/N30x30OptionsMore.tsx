import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsMore.dark.svg";
import lightIcon from "../svg/N30x30OptionsMore.light.svg";

const N30x30OptionsMore = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="More"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsMore;
