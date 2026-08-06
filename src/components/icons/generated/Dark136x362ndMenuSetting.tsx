import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/2nd Menu/Setting.svg";
import lightIcon from "../icon_light_1/36x36/2nd Menu/Setting.svg";

const Dark136x362ndMenuSetting = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Setting"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x362ndMenuSetting;
