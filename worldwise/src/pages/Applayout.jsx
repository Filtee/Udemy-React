// import AppNav from "../components/AppNav"
import Sidebar from "../components/Sidebar"
import Map from "../components/Map"
import styles from './Applayout.module.css'

function Applayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  )
}

export default Applayout
