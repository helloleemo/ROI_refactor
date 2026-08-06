import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36Exit.dark.svg";
import lightIcon from "../svg/N36x36Exit.light.svg";

const N36x36Exit = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="exit"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36Exit;
