import type { IconProps } from "./types";
import ThemedAssetIcon from "./ThemedAssetIcon";
import darkIcon from "./icon_dark_2/30x30/Options/Search.svg";
import lightIcon from "./icon_light_2/30x30/Options/Search.svg";

const SearchIcon = (props: IconProps) => {
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

export default SearchIcon;