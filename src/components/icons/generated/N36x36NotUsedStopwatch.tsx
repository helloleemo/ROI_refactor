import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36NotUsedStopwatch.dark.svg";
import lightIcon from "../svg/N36x36NotUsedStopwatch.light.svg";

const N36x36NotUsedStopwatch = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="stopwatch"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36NotUsedStopwatch;
