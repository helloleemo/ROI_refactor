import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36NotUsedPollutedwater.dark.svg";
import lightIcon from "../svg/N36x36NotUsedPollutedwater.light.svg";

const N36x36NotUsedPollutedwater = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="pollutedwater"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36NotUsedPollutedwater;
