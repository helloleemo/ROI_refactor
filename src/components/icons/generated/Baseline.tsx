import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/Baseline.dark.svg";
import lightIcon from "../svg/Baseline.light.svg";

const Baseline = (props: IconProps) => {
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

export default Baseline;
