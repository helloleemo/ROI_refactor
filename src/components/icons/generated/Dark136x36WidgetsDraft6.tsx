import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Widgets/Draft6.svg";
import lightIcon from "../icon_light_1/36x36/Widgets/Draft6.svg";

const Dark136x36WidgetsDraft6 = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Draft6"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x36WidgetsDraft6;
