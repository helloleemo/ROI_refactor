import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsMenu.dark.svg";
import lightIcon from "../svg/N30x30OptionsMenu.light.svg";

const N30x30OptionsMenu = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Menu"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsMenu;
