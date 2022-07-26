import React, { useState } from 'react';

import style from './index.module.css';

const IframeRender = (props) => {
  const [dimensions, setdimensions] = useState({ height: 100, width: 320 });

  const setDimensions = (params) => setdimensions({ ...dimensions, ...params });
  React.useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.customiframebox}>
      <iframe
        src={props.static}
        title='name'
        height={props.height || dimensions.height}
        width={props.width || dimensions.width}
        frameBorder={0}
        sandbox='allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation '
      />
    </div>
  );
};
export default IframeRender;
