import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Widgets/EE Project Summary.svg";
import lightIcon from "../icon_light_1/36x36/Widgets/EE Project Summary.svg";

const Dark136x36WidgetsEEProjectSummary = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="EE Project Summary"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x36WidgetsEEProjectSummary;
