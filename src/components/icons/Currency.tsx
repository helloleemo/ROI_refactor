import type { IconProps } from "./types";
import ThemedAssetIcon from "./ThemedAssetIcon";
import darkIcon from "./icon_dark_1/36x36/Currency.svg";
import lightIcon from "./icon_light_1/36x36/Currency.svg";

const Currency = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Currency"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Currency;