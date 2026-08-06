import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36NotUsedAircon.dark.svg";
import lightIcon from "../svg/N36x36NotUsedAircon.light.svg";

const N36x36NotUsedAircon = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="aircon"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36NotUsedAircon;
