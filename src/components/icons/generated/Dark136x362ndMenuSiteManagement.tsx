import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/2nd Menu/Site Management.svg";
import lightIcon from "../icon_light_1/36x36/2nd Menu/Site Management.svg";

const Dark136x362ndMenuSiteManagement = (props: IconProps) => {
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

export default Dark136x362ndMenuSiteManagement;
