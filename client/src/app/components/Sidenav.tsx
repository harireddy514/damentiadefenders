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
  const [isCollapsed,setIsCollapsed]=useState(true);
  const pathname = usePathname();
    function onclick(ev:any) {
        ev.preventDefault();
        setIsCollapsed(!isCollapsed);
        document.body.style.setProperty('--sb-width', isCollapsed ? '5rem':'18rem' );
        document.body.style.setProperty('--sb-visibility', isCollapsed ? 'hidden':'visible' );

       }
  return (
       <div className={styles.body}>
      <aside className={styles['sidenav']}>
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
              <Link className={pathname=="/dashboard" ? styles.active : ""} href="/dashboard">
                <div className="item">
                  <DashboardIcon />
                  <span  className={styles.collapse}>Dashboard</span>
                </div>
              </Link>
            </li>
            <li>
              <Link className={pathname=="/schedule" ? styles.active : ""} href="/schedule">
                <div className="item">
                  <TodayIcon />
                  <span className={styles.collapse}>Daily Schedule</span>
                </div>
              </Link>
            </li>
            <li>
              <Link className={pathname=="/personaldetails" ? styles.active : ""} href="/personaldetails">
                <div className="item">
                  <InfoIcon />
                  <span className={styles.collapse}>Personal Details</span>
                </div>
              </Link>
            </li>
            <li>
              <Link className={pathname=="/familydetails" ? styles.active : ""} href="/familydetails">
                <div className="item">
                  <InfoIcon />
                  <span className={styles.collapse}>Family Details</span>
                </div>
              </Link>
              </li>
              <li>
              <Link className={pathname=="/memories" ? styles.active : ""} href="/memories">
                <div className="item">
                  <CollectionsIcon />
                  <span className={styles.collapse}>Memories</span>
                </div>
              </Link>
              </li>
              <li>
              <Link className={pathname=="/memorygames" ? styles.active : ""} href="/memorygames">
                <div className="item">
                  <PsychologyIcon />
                  <span className={styles.collapse}>Memory Games</span>
                </div>
              </Link>
            </li>
            <li>
              <div className='text-white align-center m-10'>
                <button onClick={onclick}><ChevronRightIcon/></button>
                <span onClick={onclick} className={styles.collapse}>Collapse</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidenav;
