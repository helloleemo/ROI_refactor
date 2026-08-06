import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/1st Meun/Product Carbon Footprint.svg";
import lightIcon from "../icon_light_1/36x36/1st Meun/Product Carbon Footprint.svg";

const Dark136x361stMeunProductCarbonFootprint = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Product Carbon Footprint"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x361stMeunProductCarbonFootprint;
