import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36WidgetsAISummary.dark.svg";
import lightIcon from "../svg/N36x36WidgetsAISummary.light.svg";

const N36x36WidgetsAISummary = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="AI Summary"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36WidgetsAISummary;
