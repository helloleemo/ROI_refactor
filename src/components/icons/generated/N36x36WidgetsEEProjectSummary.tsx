import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36WidgetsEEProjectSummary.dark.svg";
import lightIcon from "../svg/N36x36WidgetsEEProjectSummary.light.svg";

const N36x36WidgetsEEProjectSummary = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="EE Project Summary"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36WidgetsEEProjectSummary;
