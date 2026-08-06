import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsSuccess.dark.svg";
import lightIcon from "../svg/N30x30OptionsSuccess.light.svg";

const N30x30OptionsSuccess = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Success"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsSuccess;
