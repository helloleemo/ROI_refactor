import type { IconProps } from "./types";
import ThemedAssetIcon from "./ThemedAssetIcon";
import darkIcon from "./icon_dark_1/36x36/2nd Menu/Tariff.svg";
import lightIcon from "./icon_light_1/36x36/2nd Menu/Tariff.svg";

const Tariff = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Tariff"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Tariff;
