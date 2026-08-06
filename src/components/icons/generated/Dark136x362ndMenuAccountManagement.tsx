import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/2nd Menu/Account Management.svg";
import lightIcon from "../icon_light_1/36x36/2nd Menu/Account Management.svg";

const Dark136x362ndMenuAccountManagement = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Account Management"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x362ndMenuAccountManagement;
