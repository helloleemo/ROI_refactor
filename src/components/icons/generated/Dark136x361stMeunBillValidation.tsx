import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/1st Meun/Bill Validation.svg";
import lightIcon from "../icon_light_1/36x36/1st Meun/Bill Validation.svg";

const Dark136x361stMeunBillValidation = (props: IconProps) => {
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

export default Dark136x361stMeunBillValidation;
