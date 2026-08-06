
import type { IconProps } from "./types";
import ThemedAssetIcon from "./ThemedAssetIcon";
import darkIcon from "./icon_dark_1/36x36/Widgets/Custom line.svg";
import lightIcon from "./icon_light_1/36x36/Widgets/Custom line.svg";

const CustomLine = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Custom Line"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default CustomLine;