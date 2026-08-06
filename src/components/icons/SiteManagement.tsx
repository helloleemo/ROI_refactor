import type { IconProps } from "./types";
import ThemedAssetIcon from "./ThemedAssetIcon";
import darkIcon from "./icon_dark_1/36x36/1st Meun/Site Management.svg";
import lightIcon from "./icon_light_1/36x36/1st Meun/Site Management.svg";

const SiteManagement = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Site Management"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default SiteManagement;