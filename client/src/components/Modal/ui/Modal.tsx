'use client';

import { Root } from './Root';
import { Trigger } from './Trigger';
import { Content } from './Content';
import { Portal } from '@/shared/lib/hooks';
import type { IModalProps } from '../base';

type ModalCompound = React.FC<IModalProps> & {
	Trigger: typeof Trigger;
	Content: typeof Content;
	Portal: typeof Portal;
};

export const Modal: ModalCompound = Object.assign(Root, {
	Trigger,
	Content,
	Portal,
});

export { Root, Trigger, Content, Portal };
export default Modal;
