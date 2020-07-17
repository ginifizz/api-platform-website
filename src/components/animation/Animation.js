import React, { useLayoutEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import DescribeEntity from './resource/DescribeEntity';
import BrowserWindow from '../Browser';
import Prism from '../../vendor/Prism';

const code =
  '<script type="application/ld+json">\r\n{\r\n  "@context": "http://schema.org/",\r\n  "@type": "Article",\r\n  "name": "My article title"\r\n}\r\n</script>';

const Animation = () => {
  const [terminalStatus, setTerminalStatus] = useState('pause');

  const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

  const animateDescribeEntity = useCallback(async () => {
    gsap.set('#describe', {
      position: 'absolute',
    });
    gsap.set('#result', {
      position: 'absolute',
      left: '50%',
      top: '50%',
      scale: 0.5,
      opacity: 0,
      y: +100,
      transform: 'translate(-50%, -50%)',
    });
    gsap.set('#describe', {
      position: 'absolute',
      opacity: 0,
      scale: 0.5,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    });
    gsap.set('#jsonld', {
      opacity: 0,
    });
    await wait(500);
    gsap.to('#describe', 0.3, {
      opacity: 1,
      scale: 1,
      onComplete: () => {
        setTerminalStatus('play');
      },
    });
  }, []);

  const animateResult = useCallback(async () => {
    await wait(500);
    gsap.to('#describe', 0.3, {
      opacity: 0.8,
      scale: 0.8,
      y: -100,
    });
    gsap.to('#result', 0.5, {
      opacity: 1,
      scale: 1,
      y: 0,
    });
    gsap.fromTo(
      '#jsonld',
      0.3,
      {
        y: +100,
      },
      { opacity: 1, y: 0, delay: 0.5 }
    );
  }, []);

  useLayoutEffect(() => {
    animateDescribeEntity();
  }, [animateDescribeEntity]);

  return (
    <section className="home__animation full">
      <div className="container">
        <h2>Describe your resource :</h2>
        <div className="animation__step1">
          <DescribeEntity id="describe" status={terminalStatus} onComplete={animateResult} />
          <BrowserWindow url="https://api.url.com/articles/1" id="result">
            <pre className="browser__code language-json" id="jsonld">
              <code
                dangerouslySetInnerHTML={{
                  __html: Prism.highlight(code, Prism.languages.json),
                }}
              />
            </pre>
          </BrowserWindow>
        </div>
      </div>
    </section>
  );
};

export default Animation;
