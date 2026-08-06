import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsVersionList.dark.svg";
import lightIcon from "../svg/N30x30OptionsVersionList.light.svg";

const N30x30OptionsVersionList = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Version list"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsVersionList;
