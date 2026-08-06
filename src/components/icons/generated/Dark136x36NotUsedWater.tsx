import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Not Used/water.svg";
import lightIcon from "../icon_light_1/36x36/Not Used/water.svg";

const Dark136x36NotUsedWater = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="water"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x36NotUsedWater;
