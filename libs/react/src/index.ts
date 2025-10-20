
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import reactToWebComponent from 'react-to-webcomponent';
import CollabEditor from './lib/CollabEditor';


const El = reactToWebComponent(CollabEditor, React, ReactDOMClient as any, { shadow: 'open' });

if (!customElements.get('react-collab-widget')) {
  customElements.define('react-collab-widget', El);
}

export { CollabEditor };
