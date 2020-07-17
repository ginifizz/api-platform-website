import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import BrowserWindow from '../../Browser';
import { Termynal } from '../../../vendor/termynal';

const MakeEntity = ({ onComplete, status, ...props }) => {
  const terminalRef = useRef();
  const [terminal, setTerminal] = useState();

  useEffect(() => {
    if (terminal && 'play' === status) {
      terminal.init();
    }
  }, [status, terminal]);

  useEffect(() => {
    if (!terminal) {
      const t = new Termynal(terminalRef.current, {
        onComplete,
        noInit: true,
        typeDelay: 40,
        lineDelay: 700,
        lineData: [
          { type: 'input', prompt: '$', value: 'php bin/console make:entity' },
          {
            value:
              '<br/>Class Name of the entity to create or update (e.g. <span class="colored">GrumpyElephant</span>)',
          },
          { type: 'input', prompt: '>', value: 'Article' },
          {
            value:
              '<br/>Mark this class as an api platform resource (expose a crud api for it) (yes/no) [<span class="colored">no</span>]:',
          },
          { type: 'input', prompt: '>', value: 'yes' },
          {
            value:
              '<br/><span class="colored">created: </span><span>src/Entity/Article.php</span><br/><span class="colored">created: </span><span>src/Repository/ArticleRepository.php</span>',
          },
          {
            value:
              "<br/><span>Entity generated! Now let's add some fields!</span><br/><span>You can always add more fields later manually or by re-running this command.</span>",
          },
          {
            value: '<br/><span>New property name (press to stop adding fields)</span>:',
          },
          { type: 'input', prompt: '>', value: 'name' },
          {
            value: '<br/>Field type (enter ? to see all types) [<span class="colored">string</span>]:',
            delay: 10,
          },
          { type: 'input', prompt: '>', value: '', typeDelay: 0 },
          {
            value: '<br/>Field length [<span class="colored">255</span>]:',
            delay: 10,
          },
          { type: 'input', prompt: '>', value: '', typeDelay: 0 },
          {
            value: '<br/>Can this field be null in the database (nullable) (yes/no) [<span class="colored">no</span>]:',
            delay: 10,
          },
          { type: 'input', prompt: '>', value: '', typeDelay: 0 },
          {
            value: '<br/><span class="colored">updated: </span><span>src/Entity/Article.php</span>',
          },
        ],
      });
      setTerminal(t);
    }
    return () => {
      if (terminal) {
        terminal.reset();
        setTerminal(null);
      }
    };
  }, [onComplete, terminal]);
  return (
    <BrowserWindow terminal {...props}>
      <div ref={terminalRef} className="animation__terminal" />
    </BrowserWindow>
  );
};

MakeEntity.propTypes = {
  onComplete: PropTypes.func.isRequired,
  status: PropTypes.string,
};

MakeEntity.defaultProps = {
  status: 'paused',
};

export default MakeEntity;
