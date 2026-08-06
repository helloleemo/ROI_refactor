import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30StatusAI.dark.svg";
import lightIcon from "../svg/N30x30StatusAI.light.svg";

const N30x30StatusAI = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="AI"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30StatusAI;
