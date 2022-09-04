import React, { useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('react-masonry-list'), {
  ssr: false,
});

export const useBrowserLayoutEffect = process.browser
  ? useLayoutEffect
  : () => {};

import styles from '../styles/Home.module.css';
import { mdisk, dood } from '../components/HomeData';
import { getHost } from '../utils';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home(props) {
  const { IMGS } = props;
  const router = useRouter();

  const _getColCount = (size) => {
    if (size < 1024) {
      return 2;
    }
    return 3;
  };

  const [items, setItems] = useState(IMGS.slice(0, 20));
  const [colCount, setColCount] = useState(2);

  useBrowserLayoutEffect(() => {
    const onScroll = () => {
      if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
        setItems((prevItems) => [
          ...prevItems,
          ...IMGS.slice(prevItems.length, prevItems.length + 10),
        ]);
      }
    };

    setColCount(_getColCount(window.innerWidth));
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useBrowserLayoutEffect(() => {
    const onResize = () => {
      setColCount(_getColCount(window.innerWidth));
    };
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <>
      <div className={styles.newhome}>
        <Header />
        <div className='container'>
          <h4>Hot Videos</h4>
          <div className={styles.newhomebox}>
            <Layout
              colCount={colCount}
              minWidth={100}
              items={items.map((el) => (
                <div
                  className={styles.newhomeboxitem}
                  key={`video-${el._id}`}
                  onClick={() => {
                    var urlRegex = /(https?:\/\/[^\s]+)/g;
                    const urls = el.text.match(urlRegex);
                    const linkArr = urls[0].split('/');
                    const v_id = linkArr[linkArr.length - 1];
                    router.push(`/${v_id}`);
                    // document.body.scrollTop = 0; // For Safari
                    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                  }}
                >
                  <img
                    className={styles.image}
                    alt='icon'
                    src={`https://drive.google.com/uc?export=view&id=${el.imgDriveId}`}
                  ></img>
                  {/* <pre>{el.text}</pre> */}
                </div>
              ))}
            ></Layout>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const IMGS = getHost(context).includes('dood')
    ? dood.messages
    : mdisk.messages;
  return {
    props: { IMGS },
  };
}
