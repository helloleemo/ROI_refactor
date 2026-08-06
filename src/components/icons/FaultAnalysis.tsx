import type { IconProps } from "./types";
import ThemedAssetIcon from "./ThemedAssetIcon";
import darkIcon from "./icon_dark_1/36x36/2nd Menu/Fault Analysis.svg";
import lightIcon from "./icon_light_1/36x36/2nd Menu/Fault Analysis.svg";

const FaultAnalysis = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Fault Analysis"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={27}
            defaultHeight={27}
        />
    );
};

export default FaultAnalysis;