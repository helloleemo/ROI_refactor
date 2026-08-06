import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Widgets/Planning Achievement (eneygy saving).svg";
import lightIcon from "../icon_light_1/36x36/Widgets/Planning Achievement (eneygy saving).svg";

const Dark136x36WidgetsPlanningAchievementEneygySaving = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Planning Achievement (eneygy saving)"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x36WidgetsPlanningAchievementEneygySaving;
