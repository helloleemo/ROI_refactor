import { useTheme } from "@mui/material/styles";
import type { IconProps } from "./types";

type ThemedAssetIconProps = IconProps & {
    lightSrc: string;
    darkSrc: string;
    alt: string;
    defaultWidth: number;
    defaultHeight: number;
};

const ThemedAssetIcon = ({
    width,
    height,
    accentColor,
    lightSrc,
    darkSrc,
    alt,
    defaultWidth,
    defaultHeight,
}: ThemedAssetIconProps) => {
    const theme = useTheme();
    const src = theme.palette.mode === "dark" ? darkSrc : lightSrc;

    // Keep IconProps compatibility; asset SVGs do not currently consume accentColor.
    void accentColor;

    return (
        <img
            src={src}
            alt={alt}
            width={width ?? defaultWidth}
            height={height ?? defaultHeight}
            style={{ display: "block" }}
        />
    );
};

export default ThemedAssetIcon;
