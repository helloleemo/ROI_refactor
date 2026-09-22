import { useTranslation } from "react-i18next";

const OverviewPage = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{`${t("overview.KPIoverview.title")} ID: ${sessionStorage.getItem("projectId")}`}</h1>
            <p>{t("overview.KPIoverview.description")}</p>
        </div>
    );
};

export default OverviewPage;