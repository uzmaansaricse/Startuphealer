import { ReactNode } from 'react';
import { IconBaseProps } from 'react-icons';

declare module 'react-icons' {
  export type IconType = (props: IconBaseProps) => ReactNode;
}

declare module 'react-icons/lib' {
  export type IconType = (props: IconBaseProps) => ReactNode;
}

declare module 'react-icons/fa' {
  import { IconType } from 'react-icons';
  export * from 'react-icons';
}

declare module 'react-icons/fi' {
  import { IconType } from 'react-icons';
  export * from 'react-icons';
}
