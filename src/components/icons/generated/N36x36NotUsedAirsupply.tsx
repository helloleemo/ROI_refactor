import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36NotUsedAirsupply.dark.svg";
import lightIcon from "../svg/N36x36NotUsedAirsupply.light.svg";

const N36x36NotUsedAirsupply = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="airsupply"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36NotUsedAirsupply;
