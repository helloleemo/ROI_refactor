import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36WidgetsSiteMap.dark.svg";
import lightIcon from "../svg/N36x36WidgetsSiteMap.light.svg";

const N36x36WidgetsSiteMap = (props: IconProps) => {
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

export default N36x36WidgetsSiteMap;
