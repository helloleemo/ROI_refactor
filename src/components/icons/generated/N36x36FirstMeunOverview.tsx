import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36FirstMeunOverview.dark.svg";
import lightIcon from "../svg/N36x36FirstMeunOverview.light.svg";

const N36x36FirstMeunOverview = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Overview"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36FirstMeunOverview;
