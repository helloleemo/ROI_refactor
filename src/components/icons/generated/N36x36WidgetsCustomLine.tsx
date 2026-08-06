import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36WidgetsCustomLine.dark.svg";
import lightIcon from "../svg/N36x36WidgetsCustomLine.light.svg";

const N36x36WidgetsCustomLine = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Custom line"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36WidgetsCustomLine;
