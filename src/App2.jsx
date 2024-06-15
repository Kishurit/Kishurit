<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Child() {
  const [data, setData] = useState('loading');
  const isMounted = useIsMounted();

  // simulate an api call and update state
  useEffect(() => {
    delay(3000).then(() => {
      if (isMounted()) setData('OK');
    });
  }, [isMounted]);

  return <p>{data}</p>;
}

export default function App() {
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((state) => !state);
  };

  return (
    <>
      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
      {isVisible && <Child />}
    </>
  );
}
=======
import React, { useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Child() {
  const [data, setData] = useState('loading');
  const isMounted = useIsMounted();

  // simulate an api call and update state
  useEffect(() => {
    delay(3000).then(() => {
      if (isMounted()) setData('OK');
    });
  }, [isMounted]);

  return <p>{data}</p>;
}

export default function App() {
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((state) => !state);
  };

  return (
    <>
      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
      {isVisible && <Child />}
    </>
  );
}
>>>>>>> 80af62dbefbeccbf611f3c65aede4ade31d713c9
