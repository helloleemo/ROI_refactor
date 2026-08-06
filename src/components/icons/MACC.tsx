import type { IconProps } from "./types";
import ThemedAssetIcon from "./ThemedAssetIcon";
import darkIcon from "./icon_dark_1/36x36/2nd Menu/MACC.svg";
import lightIcon from "./icon_light_1/36x36/2nd Menu/MACC.svg";

const MACC = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="MACC"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default MACC;
