import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/2nd Menu/Performance.svg";
import lightIcon from "../icon_light_1/36x36/2nd Menu/Performance.svg";

const Dark136x362ndMenuPerformance = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Performance"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x362ndMenuPerformance;
