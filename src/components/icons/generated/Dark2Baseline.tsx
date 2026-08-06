import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_2/Baseline.svg";
import lightIcon from "../icon_light_2/Baseline.svg";

const Dark2Baseline = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Baseline"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark2Baseline;
