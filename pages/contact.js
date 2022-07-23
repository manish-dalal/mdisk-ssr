import Header from '../components/Header';
import IframeRender from '../components/Iframe';

const contactFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSdXoWMu2gTDcvUHWd_Jnd8AAvhDg2F-hNBcnV4lgcWkZiKHvA/viewform?embedded=true';

export default function contact() {
  return (
    <>
      <Header />
      <IframeRender static={contactFormUrl} />
    </>
  );
}
