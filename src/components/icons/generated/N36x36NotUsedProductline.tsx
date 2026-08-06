import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36NotUsedProductline.dark.svg";
import lightIcon from "../svg/N36x36NotUsedProductline.light.svg";

const N36x36NotUsedProductline = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Productline"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36NotUsedProductline;
