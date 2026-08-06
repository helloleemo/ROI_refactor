import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36WidgetsPlanningAchievementEneygySaving.dark.svg";
import lightIcon from "../svg/N36x36WidgetsPlanningAchievementEneygySaving.light.svg";

const N36x36WidgetsPlanningAchievementEneygySaving = (props: IconProps) => {
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

export default N36x36WidgetsPlanningAchievementEneygySaving;
