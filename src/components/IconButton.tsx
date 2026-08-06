import MuiIconButton from "@mui/material/IconButton"
import type { SxProps, Theme } from "@mui/material/styles"
import type { ReactNode } from "react"

type SharedIconButtonProps = {
    id?: string
    icon: ReactNode
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    active?: boolean
    size?: number
    ariaLabel?: string
    sx?: SxProps<Theme>
}

const SharedIconButton = ({
    id,
    icon,
    onClick,
    active = false,
    size = 44,
    ariaLabel,
    sx,
}: SharedIconButtonProps) => {
    return (
        <MuiIconButton
            id={id}
            onClick={onClick}
            aria-label={ariaLabel}
            sx={{
                width: size,
                height: size,
                borderRadius: "10px",
                border: "1px solid",
                borderColor: active ? "primary.main" : "divider",
                color: active ? "primary.main" : "text.primary",
                backgroundColor: active ? "action.selected" : "background.paper",
                boxSizing: "border-box",
                "&:hover": {
                    backgroundColor: "action.hover",
                },
                ...sx,
            }}
        >
            {icon}
        </MuiIconButton>
    )
}

export default SharedIconButton