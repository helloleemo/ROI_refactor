import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuFaultAnalysis.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuFaultAnalysis.light.svg";

const N36x36SecondMenuFaultAnalysis = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Fault Analysis"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMenuFaultAnalysis;
