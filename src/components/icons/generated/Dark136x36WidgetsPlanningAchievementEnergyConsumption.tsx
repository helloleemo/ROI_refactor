import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Widgets/Planning Achievement (Energy Consumption).svg";
import lightIcon from "../icon_light_1/36x36/Widgets/Planning Achievement (Energy Consumption).svg";

const Dark136x36WidgetsPlanningAchievementEnergyConsumption = (props: IconProps) => {
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

export default Dark136x36WidgetsPlanningAchievementEnergyConsumption;
