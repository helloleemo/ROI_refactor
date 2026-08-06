import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36WidgetsTargetKPIs.dark.svg";
import lightIcon from "../svg/N36x36WidgetsTargetKPIs.light.svg";

const N36x36WidgetsTargetKPIs = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Target KPIs"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36WidgetsTargetKPIs;
