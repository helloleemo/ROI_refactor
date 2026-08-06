import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Widgets/Site map.svg";
import lightIcon from "../icon_light_1/36x36/Widgets/Site map.svg";

const Dark136x36WidgetsSiteMap = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Site map"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x36WidgetsSiteMap;
