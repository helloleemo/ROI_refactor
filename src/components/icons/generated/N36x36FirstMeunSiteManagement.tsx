import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36FirstMeunSiteManagement.dark.svg";
import lightIcon from "../svg/N36x36FirstMeunSiteManagement.light.svg";

const N36x36FirstMeunSiteManagement = (props: IconProps) => {
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

export default N36x36FirstMeunSiteManagement;
