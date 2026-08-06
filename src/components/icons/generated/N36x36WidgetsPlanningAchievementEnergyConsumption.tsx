import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36WidgetsPlanningAchievementEnergyConsumption.dark.svg";
import lightIcon from "../svg/N36x36WidgetsPlanningAchievementEnergyConsumption.light.svg";

const N36x36WidgetsPlanningAchievementEnergyConsumption = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Planning Achievement (Energy Consumption)"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36WidgetsPlanningAchievementEnergyConsumption;
