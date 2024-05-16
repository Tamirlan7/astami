import c from './DashboardPage.module.scss'
import Container from "../../components/Container/Container.tsx";

function DashboardPage() {
    return (
        <div className={c.page}>
            <Container>
                <div className={c.main}>
                    <h1>Dashboard Page</h1>
                </div>
            </Container>
        </div>
    );
}

export default DashboardPage;