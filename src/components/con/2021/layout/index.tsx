import React, { createContext, useState, useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import Helmet from 'react-helmet';
import '@styles/components/con/2021/index.scss';
import Footer from '@components/con/2021/layout/Footer';
import Nav from '@components/con/2021/layout/Nav';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import helmetConfig from '../../../../helmetConfig';
import { DESCRIPTION, TITLE, OG_IMAGE } from '../data/meta';

dayjs.extend(localizedFormat);

export const ConfContext = createContext(null);

interface LayoutProps {
  location: {
    pathname?: string;
    hash?: string;
  };
}

const Layout: React.ComponentType<LayoutProps> = ({ children, location }) => {
  dayjs.extend(localizedFormat);
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: 'API Platform Conference',
    url: 'https://api-platform.com/con/2021',
  };
  const eventData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'API Platform Conference 2021',
    description: 'The first international conference dedicated to API Platform and its ecosystem',
    url: 'https://api-platform.com/con/2021',
    eventStatus: 'http://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    startDate: '2021-09-08',
    endDate: '2021-09-10',
    organizer: {
      '@type': 'Organization',
      name: 'Les-Tilleuls.coop',
      url: 'https://les-tilleuls.coop/en',
    },
    location: {
      '@type': 'Place',
      name: 'Euratechnologies',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lille',
        addressRegion: 'Hauts de France',
        postalCode: '59000',
        streetAddress: 'Place de Saintignon, 165 avenue de Bretagne',
      },
    },
  };

  const [activeLink, setActiveLink] = useState('home');
  const [sectionsVisibles, setSectionsVisibles] = useState<string[]>([]);
  const [isEventBriteLoaded, setIsEventBriteLoaded] = useState(false);

  const goToLink = useCallback((section) => {
    const element = document.querySelector(`#${section}`);
    element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
    s.onload = () => {
      setIsEventBriteLoaded(true);
    };
    document.body.appendChild(s);
  }, [setIsEventBriteLoaded]);

  return (
    <ConfContext.Provider
      value={{ activeLink, setActiveLink, goToLink, isEventBriteLoaded, sectionsVisibles, setSectionsVisibles }}
    >
      <Helmet {...helmetConfig.head}>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:url" content="https://api-platform.com/con/2021" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@coopTilleuls" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">{JSON.stringify(websiteData)}</script>
        <script type="application/ld+json">{JSON.stringify(eventData)}</script>
        <script defer src="https://unpkg.com/smoothscroll-polyfill/dist/smoothscroll.min.js" />
      </Helmet>
      <div className="conf" id="conf">
        <div className="conf__background" />
        <Nav location={location} />
        <div className="conf__content">
          {children}
          <Footer />
        </div>
      </div>
    </ConfContext.Provider>
  );
};

export default Layout;