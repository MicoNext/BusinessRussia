import DropdownLink from './DropdownLink';
import NavDropdown from './NavDropdown';
import NavItem from './NavItem';
import { MENU } from '../constants/menu.data';

function PrimaryNav() {
	return (
		<nav
			id='site-navigation'
			aria-label='Основная навигация'
			className='relative self-stretch'
		>
			<ul className='flex flex-wrap gap-x-6 gap-y-2 h-full'>
				{MENU.map(item =>
					item.children && item.children.length > 0 ? (
						<NavDropdown
							key={item.label}
							label={item.label}
						>
							{item.children.map(child => (
								<DropdownLink
									key={child.href}
									href={child.href}
									label={child.label}
								/>
							))}
						</NavDropdown>
					) : (
						<NavItem
							key={item.href ?? item.label}
							href={item.href ?? '#'}
							label={item.label}
						/>
					)
				)}
			</ul>
		</nav>
	);
}

export default PrimaryNav;
