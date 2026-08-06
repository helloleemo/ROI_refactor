import type { IconProps } from "./types";
import ThemedAssetIcon from "./ThemedAssetIcon";
import darkIcon from "./icon_dark_1/36x36/2nd Menu/Planning.svg";
import lightIcon from "./icon_light_1/36x36/2nd Menu/Planning.svg";

const Planning = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Planning"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Planning;
