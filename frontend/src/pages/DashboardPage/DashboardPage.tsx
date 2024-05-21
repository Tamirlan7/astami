import c from './DashboardPage.module.scss'
import Container from "../../components/Container/Container.tsx";
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";
import Title from "@ui/Title/Title.tsx";

function DashboardPage() {
    return (
        <ControlPanelWrapper>
            <div className={c.block}>
                <Title>Dashboard</Title>
            </div>
        </ControlPanelWrapper>
    );
}

export default DashboardPage;