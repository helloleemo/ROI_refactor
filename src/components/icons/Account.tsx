
import { type IconProps } from './types';

const Account = ({ width = 27, height = 27, accentColor = "#0087DC" }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 37 37" fill="none">
            <circle opacity="0.2" cx="18.5" cy="18.5" r="17.5" stroke="currentColor" strokeWidth="2" />
            <circle cx="18.9996" cy="13.4" r="5.4" stroke="currentColor" strokeWidth="2" />
            <path d="M19 19C13.0267 19 11.1778 24.3333 11 27H20.6" stroke="currentColor" strokeWidth="2" />
            <path d="M25.3162 22.2002C26.4436 23.8246 26.9142 25.7198 26.9996 27.0002H20.5996" stroke={accentColor} strokeWidth="2" />
        </svg>
    )
}

export default Account