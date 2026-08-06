import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsBrowse.dark.svg";
import lightIcon from "../svg/N30x30OptionsBrowse.light.svg";

const N30x30OptionsBrowse = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Browse"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsBrowse;
