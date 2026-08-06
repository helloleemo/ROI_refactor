import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuEnergyBaseline.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuEnergyBaseline.light.svg";

const N36x36SecondMenuEnergyBaseline = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Energy Baseline"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMenuEnergyBaseline;
