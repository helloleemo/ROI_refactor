import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/2nd Menu/Dashboard.svg";
import lightIcon from "../icon_light_1/36x36/2nd Menu/Dashboard.svg";

const Dark136x362ndMenuDashboard = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Dashboard"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x362ndMenuDashboard;
