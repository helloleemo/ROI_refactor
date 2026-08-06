import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/2nd Menu/Reprting.svg";
import lightIcon from "../icon_light_1/36x36/2nd Menu/Reprting.svg";

const Dark136x362ndMenuReprting = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Reprting"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x362ndMenuReprting;
