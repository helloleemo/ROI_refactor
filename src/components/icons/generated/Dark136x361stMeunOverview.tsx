import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/1st Meun/Overview.svg";
import lightIcon from "../icon_light_1/36x36/1st Meun/Overview.svg";

const Dark136x361stMeunOverview = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Overview"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x361stMeunOverview;
