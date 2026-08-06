import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsAIInsight1.dark.svg";
import lightIcon from "../svg/N30x30OptionsAIInsight1.light.svg";

const N30x30OptionsAIInsight1 = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="AI Insight-1"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsAIInsight1;
