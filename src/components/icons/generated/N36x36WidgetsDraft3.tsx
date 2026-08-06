import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36WidgetsDraft3.dark.svg";
import lightIcon from "../svg/N36x36WidgetsDraft3.light.svg";

const N36x36WidgetsDraft3 = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Draft3"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36WidgetsDraft3;
