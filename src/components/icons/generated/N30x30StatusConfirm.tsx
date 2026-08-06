import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30StatusConfirm.dark.svg";
import lightIcon from "../svg/N30x30StatusConfirm.light.svg";

const N30x30StatusConfirm = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Confirm"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30StatusConfirm;
