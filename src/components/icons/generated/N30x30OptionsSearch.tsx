import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsSearch.dark.svg";
import lightIcon from "../svg/N30x30OptionsSearch.light.svg";

const N30x30OptionsSearch = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Search"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsSearch;
