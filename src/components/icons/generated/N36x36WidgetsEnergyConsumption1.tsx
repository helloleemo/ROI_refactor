import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36WidgetsEnergyConsumption1.dark.svg";
import lightIcon from "../svg/N36x36WidgetsEnergyConsumption1.light.svg";

const N36x36WidgetsEnergyConsumption1 = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Energy Consumption-1"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36WidgetsEnergyConsumption1;
