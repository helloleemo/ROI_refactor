import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsFilter.dark.svg";
import lightIcon from "../svg/N30x30OptionsFilter.light.svg";

const N30x30OptionsFilter = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Filter"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsFilter;
