import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

function Loading() {
  return (
    <div>
      <Dimmer inverted active>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </div>
  );
}

export default Loading;
