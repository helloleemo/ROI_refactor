import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/Help.svg";
import lightIcon from "../icon_light_1/Help.svg";

const Dark1Help = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Help"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark1Help;
