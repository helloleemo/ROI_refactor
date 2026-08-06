import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Language.svg";
import lightIcon from "../icon_light_1/36x36/Language.svg";

const Dark136x36Language = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Language"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x36Language;
