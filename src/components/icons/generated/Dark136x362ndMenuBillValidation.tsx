import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/2nd Menu/Bill Validation.svg";
import lightIcon from "../icon_light_1/36x36/2nd Menu/Bill Validation.svg";

const Dark136x362ndMenuBillValidation = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Bill Validation"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x362ndMenuBillValidation;
