import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/DashboardSidebar/Sidebar'
import styles from '../Home/home.module.css'
const Home = () => {
  return (
    <div className={styles.home}>
      <Sidebar/>
      <main className={styles.main}>
        <Outlet/>
      </main>
    </div>
  )
}

export default Home