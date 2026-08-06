import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Not Used/door.svg";
import lightIcon from "../icon_light_1/36x36/Not Used/door.svg";

const Dark136x36NotUsedDoor = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="door"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x36NotUsedDoor;
