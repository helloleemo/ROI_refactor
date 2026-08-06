import type { IconProps } from "./types";
import ThemedAssetIcon from "./ThemedAssetIcon";
import darkIcon from "./icon_dark_2/30x30/Options/Setting.svg";
import lightIcon from "./icon_light_2/30x30/Options/Setting.svg";

const Setting = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Setting"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={27}
            defaultHeight={27}
        />
    );
};

export default Setting;
