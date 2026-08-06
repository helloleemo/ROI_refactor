import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36NotUsedDownloadReport.dark.svg";
import lightIcon from "../svg/N36x36NotUsedDownloadReport.light.svg";

const N36x36NotUsedDownloadReport = (props: IconProps) => {
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

export default N36x36NotUsedDownloadReport;
