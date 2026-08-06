import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Widgets/Energy Monitoring.svg";
import lightIcon from "../icon_light_1/36x36/Widgets/Energy Monitoring.svg";

const Dark136x36WidgetsEnergyMonitoring = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Energy Monitoring"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x36WidgetsEnergyMonitoring;
