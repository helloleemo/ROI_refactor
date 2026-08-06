import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Widgets/Info.svg";
import lightIcon from "../icon_light_1/36x36/Widgets/Info.svg";

const Dark136x36WidgetsInfo = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Info"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x36WidgetsInfo;
