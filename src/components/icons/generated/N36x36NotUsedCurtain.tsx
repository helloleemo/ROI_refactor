import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36NotUsedCurtain.dark.svg";
import lightIcon from "../svg/N36x36NotUsedCurtain.light.svg";

const N36x36NotUsedCurtain = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="curtain"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36NotUsedCurtain;
