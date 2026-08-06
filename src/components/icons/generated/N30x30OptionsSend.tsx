import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsSend.dark.svg";
import lightIcon from "../svg/N30x30OptionsSend.light.svg";

const N30x30OptionsSend = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Send"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsSend;
