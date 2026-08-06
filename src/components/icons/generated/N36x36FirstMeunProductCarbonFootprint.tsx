import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36FirstMeunProductCarbonFootprint.dark.svg";
import lightIcon from "../svg/N36x36FirstMeunProductCarbonFootprint.light.svg";

const N36x36FirstMeunProductCarbonFootprint = (props: IconProps) => {
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

export default N36x36FirstMeunProductCarbonFootprint;
