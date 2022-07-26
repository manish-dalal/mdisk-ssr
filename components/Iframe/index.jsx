import React from 'react';

import style from './index.module.css';

const IframeRender = (props) => {
  return (
    <div className={style.customiframebox}>
      <iframe
        src={props.static}
        title='name'
        height={props.height}
        width={props.width}
        frameBorder={0}
        sandbox='allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation '
      />
    </div>
  );
};
export default IframeRender;
