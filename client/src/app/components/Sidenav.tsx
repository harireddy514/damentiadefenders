"use client"
import React, { useState } from 'react'
import styles from './Sidenav.module.css'
import DashboardIcon from "@mui/icons-material/Dashboard";
import TodayIcon from "@mui/icons-material/Today";
import InfoIcon from "@mui/icons-material/Info";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CollectionsIcon from "@mui/icons-material/Collections";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import {usePathname} from "next/navigation";
const Sidenav = () => {
  const [isExpanded,setIsExpanded]=useState(true);
  const pathname = usePathname();
  function onclick(ev) {
    ev.preventDefault();
    setIsExpanded(!isExpanded);
    document.body.style.setProperty(
      "--sb-width",
      isExpanded ? "18rem" : "5rem"
    );

    document.body.style.setProperty(
      "--sb-visibility",
      isExpanded ? "visible" : "hidden"
    );
  }

  React.useEffect(() => {
    document.body.style.setProperty("--sb-width", "5rem");
    document.body.style.setProperty("--sb-visibility", "hidden");
  }, []);
  return (
       <div>
      <aside className={styles.sidenav}>
        <div>
          <a className="mb-10" href="/" target="_blank">
            <span className={styles.collapse} style={{fontWeight:'bold',fontSize:'1.25rem'}}>
              Dementia Defenders
            </span>
          </a>
        </div>
        <hr className={styles.hr} />
        <div className="w-auto">
          <ul>
            <li>
              <Link className={pathname==="/dashboard" ? styles.active : ""} href="/dashboard">
                <div className={styles.item}>
                  <DashboardIcon />
                  <span  className={styles.collapse}>Dashboard</span>
                </div>
              </Link>
            </li>
            <li>
              <Link className={pathname==="/schedule" ? styles.active : ""} href="/schedule">
                <div className={styles.item}>
                  <TodayIcon />
                  <span className={styles.collapse}>Daily Schedule</span>
                </div>
              </Link>
            </li>
            <li>
              <Link className={pathname==="/personaldetails" ? styles.active : ""} href="/personaldetails">
                <div className={styles.item}>
                  <InfoIcon />
                  <span className={styles.collapse}>Personal Details</span>
                </div>
              </Link>
            </li>
            <li>
              <Link className={pathname=="/familydetails" ? styles.active : ""} href="/familydetails">
                <div className={styles.item}>
                  <InfoIcon />
                  <span className={styles.collapse}>Family Details</span>
                </div>
              </Link>
              </li>
              <li>
              <Link className={pathname==="/memories" ? styles.active : ""} href="/memories">
                <div className={styles.item}>
                  <CollectionsIcon />
                  <span className={styles.collapse}>Memories</span>
                </div>
              </Link>
              </li>
              <li>
              <Link className={pathname==="/memorygames" ? styles.active : ""} href="/memorygames">
                <div className={styles.item}>
                  <PsychologyIcon />
                  <span className={styles.collapse}>Memory Games</span>
                </div>
              </Link>
            </li>
            <li>
              <div className='text-white align-center m-10'>
                <button onClick={onclick}><ChevronRightIcon/></button>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidenav;
