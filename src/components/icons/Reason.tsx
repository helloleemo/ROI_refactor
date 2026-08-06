import type { IconProps } from "./types";
import ThemedAssetIcon from "./ThemedAssetIcon";
import darkIcon from "./icon_dark_1/Help.svg";
import lightIcon from "./icon_light_1/Help.svg";

const Reason = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Reason"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Reason;