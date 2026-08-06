import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_2/30x30/Options/Reload-1.svg";
import lightIcon from "../icon_light_2/30x30/Options/Reload-1.svg";

const Dark230x30OptionsReload1 = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Reload-1"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default Dark230x30OptionsReload1;
