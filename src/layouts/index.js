import styles from './index.css';
import React from 'react';
import { Header } from '@/component/header';
import { Router } from '@/component/router';

function BasicLayout(props) {
  if (props.location.pathname === '/login') {
    return props.children
  }
  return (
    <div className={styles.normal}>
      {/*<h1 className={styles.title}>Yay! Welcome to umi!</h1>*/}
      <Header/>
      <div className={styles.content}>
        <Router/>
        {props.children}
      </div>
    </div>
  );
}

export default BasicLayout;
