import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30StatusError.dark.svg";
import lightIcon from "../svg/N30x30StatusError.light.svg";

const N30x30StatusError = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Error"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30StatusError;
