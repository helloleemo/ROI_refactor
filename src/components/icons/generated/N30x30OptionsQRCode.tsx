import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsQRCode.dark.svg";
import lightIcon from "../svg/N30x30OptionsQRCode.light.svg";

const N30x30OptionsQRCode = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="QR Code"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsQRCode;
