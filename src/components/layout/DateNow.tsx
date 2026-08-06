import { useState, useEffect } from "react";

const utc8Formatter = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
});

const formatUtc8DateTime = (date: Date) => {
    const parts = utc8Formatter.formatToParts(date);
    const valueByType = Object.fromEntries(parts.map((part) => [part.type, part.value]));

    return `${valueByType.year}/${valueByType.month}/${valueByType.day} ${valueByType.hour}:${valueByType.minute}:${valueByType.second} (UTC+8)`;
};

const DateNow = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <span>
            {formatUtc8DateTime(currentDate)}
        </span>
    );
};

export default DateNow;