import type React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ng-insights-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { boardId?: string };
    }
  }
}

export {};
