import { useState, useEffect } from 'react';
import styles from './static.module.css';
// import { config } from '../../config';

const Disclaimer = () => {
  const [config, setconfig] = useState({ hostname: '', origin: '' });
  useEffect(() => {
    setconfig({
      hostname: window.location.hostname,
      origin: window.location.origin,
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1>{`Disclaimers for ${config.hostname}`}</h1>
              <p>
                {`All the information on this website -  ${config.origin} - is
                published in good faith and for general information purpose
                only. ${config.hostname} does not make any warranties about the completeness,
                reliability and accuracy of this information. Any action you
                take upon the information you find on this website (${config.hostname}), is
                strictly at your own risk. ${config.hostname} will not be liable for any
                losses and/or damages in connection with the use of our website.`}
              </p>
              <p>
                From our website, you can visit other websites by following
                hyperlinks to such external sites. While we strive to provide
                only quality links to useful and ethical websites, we have no
                control over the content and nature of these sites. These links
                to other websites do not imply a recommendation for all the
                content found on these sites. Site owners and content may change
                without notice and may occur before we have the opportunity to
                remove a link which may have gone 'bad'.
              </p>
              <p>
                Please be also aware that when you leave our website, other
                sites may have different privacy policies and terms which are
                beyond our control. Please be sure to check the Privacy Policies
                of these sites as well as their "Terms of Service" before
                engaging in any business or uploading any information.
              </p>

              <h2>AFFILIATES DISCLAIMER</h2>
              <p>
                The Site may contain links to affiliate websites, and we receive
                an affiliate commission for any purchases made by you on the
                affiliate website using such links.
              </p>
              <p>
                We are a participant in the Amazon Services LLC Associates
                Program, an affiliate advertising program designed to provide a
                means for us to earn advertising fees by linking to Amazon.com
                and affiliated websites.
              </p>

              <h2>EXTERNAL LINKS DISCLAIMER</h2>
              <p>
                The Site may contain (or you may be sent through the site) to
                other websites or content belonging to or originating from third
                parties or links to websites and features in banners or other
                advertising. Such external links are not investigated,
                monitored, or checked for accuracy, adequacy, validity,
                reliability, availability, or completeness by us. WE DO NOT
                WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE
                ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY
                THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR
                FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING. WE WILL NOT
                BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY
                TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR
                SERVICES.
              </p>

              <h2>CONSENT</h2>
              <p>
                By using our website, you hereby consent to our disclaimer and
                agree to its terms.
              </p>
              <h2>UPDATE</h2>
              <p>
                Should we update, amend or make any changes to this document,
                those changes will be prominently posted here.
              </p>
              <h2>CONTACT US</h2>
              <p>
                If you have any questions about these Terms and Conditions, You
                can contact us:
              </p>
              <ul>
                <li>
                  By visiting this page on our website:{' '}
                  <a
                    href={`${config.origin}/contact`}
                    rel='noreferrer'
                    target='_blank'
                  >
                    {`${config.origin}/contact`}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Disclaimer;
