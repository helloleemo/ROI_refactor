import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36WidgetsMap.dark.svg";
import lightIcon from "../svg/N36x36WidgetsMap.light.svg";

const N36x36WidgetsMap = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Map"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36WidgetsMap;
