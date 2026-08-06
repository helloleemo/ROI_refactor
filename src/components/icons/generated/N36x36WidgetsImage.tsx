import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36WidgetsImage.dark.svg";
import lightIcon from "../svg/N36x36WidgetsImage.light.svg";

const N36x36WidgetsImage = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Image"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36WidgetsImage;
