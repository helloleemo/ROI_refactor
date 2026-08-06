import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36NotUsedCctv.dark.svg";
import lightIcon from "../svg/N36x36NotUsedCctv.light.svg";

const N36x36NotUsedCctv = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="cctv"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36NotUsedCctv;
