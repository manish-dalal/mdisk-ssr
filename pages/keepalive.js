import React from 'react';

const Keepalive = (props) => {
  return (
    <div>
      <div>Hello</div>
      <div>{`Request url:- ${props.url}`}</div>
    </div>
  );
};

export default Keepalive;
export async function getServerSideProps(context) {
  const { url = '' } = context.query;

  if (url) {
    try {
      await fetch(url);
    } catch (error) {}
  }

  return { props: { url } };
}
