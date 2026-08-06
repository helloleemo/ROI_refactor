import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Widgets/Carbon Emission-1.svg";
import lightIcon from "../icon_light_1/36x36/Widgets/Carbon Emission-1.svg";

const Dark136x36WidgetsCarbonEmission1 = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Carbon Emission-1"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x36WidgetsCarbonEmission1;
