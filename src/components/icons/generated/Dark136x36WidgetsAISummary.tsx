import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Widgets/AI Summary.svg";
import lightIcon from "../icon_light_1/36x36/Widgets/AI Summary.svg";

const Dark136x36WidgetsAISummary = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="AI Summary"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x36WidgetsAISummary;
