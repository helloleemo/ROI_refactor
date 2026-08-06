import type { IconProps } from "./types";
import ThemedAssetIcon from "./ThemedAssetIcon";
import darkIcon from "./icon_dark_1/36x36/2nd Menu/Doc. Management.svg";
import lightIcon from "./icon_light_1/36x36/2nd Menu/Doc. Management.svg";

const DocManagement = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Document Management"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default DocManagement;
