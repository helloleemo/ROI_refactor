import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsEyesclose.dark.svg";
import lightIcon from "../svg/N30x30OptionsEyesclose.light.svg";

const N30x30OptionsEyesclose = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Eyesclose"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsEyesclose;
