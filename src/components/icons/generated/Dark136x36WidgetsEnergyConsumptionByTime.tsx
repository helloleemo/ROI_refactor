import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Widgets/Energy Consumption(by time).svg";
import lightIcon from "../icon_light_1/36x36/Widgets/Energy Consumption(by time).svg";

const Dark136x36WidgetsEnergyConsumptionByTime = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Energy Consumption(by time)"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x36WidgetsEnergyConsumptionByTime;
