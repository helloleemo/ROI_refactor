import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36NotUsedTOU.dark.svg";
import lightIcon from "../svg/N36x36NotUsedTOU.light.svg";

const N36x36NotUsedTOU = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="TOU"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36NotUsedTOU;
