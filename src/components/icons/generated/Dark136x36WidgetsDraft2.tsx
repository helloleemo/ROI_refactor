import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Widgets/Draft2.svg";
import lightIcon from "../icon_light_1/36x36/Widgets/Draft2.svg";

const Dark136x36WidgetsDraft2 = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Draft2"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x36WidgetsDraft2;
