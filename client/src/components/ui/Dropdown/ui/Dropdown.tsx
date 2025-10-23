'use client';

import type { DropdownProps } from '@/components/ui/Dropdown/base';
import { Root } from './Root';
import { Trigger } from './Trigger';
import { Content } from './Content';
import { Portal } from '@/shared/lib/hooks';

type DropdownCompound = React.FC<DropdownProps> & {
	Trigger: typeof Trigger;
	Content: typeof Content;
	Portal: typeof Portal;
};

export const Dropdown: DropdownCompound = Object.assign(Root, {
	Trigger,
	Content,
	Portal,
});

export { Root, Trigger, Content, Portal };
export type { DropdownProps };
export default Dropdown;
