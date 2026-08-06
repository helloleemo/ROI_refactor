import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36WidgetsEnergySavingRanking.dark.svg";
import lightIcon from "../svg/N36x36WidgetsEnergySavingRanking.light.svg";

const N36x36WidgetsEnergySavingRanking = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Energy Saving Ranking"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36WidgetsEnergySavingRanking;
