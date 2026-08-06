import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/1st Meun/Backend.svg";
import lightIcon from "../icon_light_1/36x36/1st Meun/Backend.svg";

const Dark136x361stMeunBackend = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Backend"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x361stMeunBackend;
