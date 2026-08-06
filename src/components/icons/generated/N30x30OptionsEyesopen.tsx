import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsEyesopen.dark.svg";
import lightIcon from "../svg/N30x30OptionsEyesopen.light.svg";

const N30x30OptionsEyesopen = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Eyesopen"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsEyesopen;
