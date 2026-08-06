import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuPerformance.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuPerformance.light.svg";

const N36x36SecondMenuPerformance = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Performance"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMenuPerformance;
