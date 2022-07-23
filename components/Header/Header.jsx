import React from 'react';
import Link from 'next/link';
import style from './header.module.css';

export default function Header() {
  return (
    <header className={style.appheader}>
      <div className={`${style.container} container`}>
        <Link href='/'>
          <img
            src='https://res.cloudinary.com/ddvaiwvwr/image/upload/v1647776300/fdisk.in/play_ygqo5c_mmlo5w.webp'
            alt='logo'
            className={style.headerlogo}
          />
        </Link>
        <div>
          <Link href='/contact'>Contact</Link>
        </div>
      </div>
    </header>
  );
}
