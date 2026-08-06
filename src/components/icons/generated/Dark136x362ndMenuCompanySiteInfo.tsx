import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/2nd Menu/Company & Site Info.svg";
import lightIcon from "../icon_light_1/36x36/2nd Menu/Company & Site Info.svg";

const Dark136x362ndMenuCompanySiteInfo = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Company & Site Info"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x362ndMenuCompanySiteInfo;
