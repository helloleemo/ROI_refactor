import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/Not Used/download report.svg";
import lightIcon from "../icon_light_1/36x36/Not Used/download report.svg";

const Dark136x36NotUsedDownloadReport = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="download report"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x36NotUsedDownloadReport;
