'use client';

import type { SidebarProps } from '../types';
import { Root } from './Root';
import { Trigger } from './Trigger';
import { Close } from './Close';
import { Portal } from '@/shared/lib/hooks';
import { Overlay } from './Overlay';
import { Content } from './Content';
import { Header } from './Header';
import { Footer } from './Footer';

type SidebarCompound = React.FC<SidebarProps> & {
	Trigger: typeof Trigger;
	Portal: typeof Portal;
	Overlay: typeof Overlay;
	Content: typeof Content;
	Close: typeof Close;
	Header: typeof Header;
	Footer: typeof Footer;
};

export const Sidebar: SidebarCompound = Object.assign(Root, {
	Trigger,
	Portal,
	Overlay,
	Content,
	Close,
	Header,
	Footer,
});

export { Root, Trigger, Close, Portal, Overlay, Content, Header, Footer };
export type { SidebarProps };
export default Sidebar;
