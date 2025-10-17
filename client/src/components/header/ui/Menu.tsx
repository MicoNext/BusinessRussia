import DropdownLink from './DropdownLink';
import NavDropdown from './NavDropdown';
import NavItem from './NavItem';
import { MENU } from '../constants/menu.data';

function Menu() {
	return (
		<nav
			id='site-navigation'
			aria-label='Основная навигация'
			className='relative hidden md:flex min-h-12 px-4'
		>
			<ul className='flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2'>
				{MENU.map(item =>
					item.children && item.children.length > 0 ? (
						<NavDropdown
							key={item.label}
							label={item.label}
							parentHref={item.href ?? '#'}
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

export default Menu;
