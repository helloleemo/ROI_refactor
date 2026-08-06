import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsAIInsight.dark.svg";
import lightIcon from "../svg/N30x30OptionsAIInsight.light.svg";

const N30x30OptionsAIInsight = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="AI Insight"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsAIInsight;
