import Logo from "./logo/Logo"

export default function Header({ type, hiddenTitile }: { type?: "help", hiddenTitile?: true }) {
    return (
        <header className="mb-6 md:mb-8">
            <div className="flex justify-center mb-6 md:mb-8">
                <div className="transform hover:scale-105 transition-transform duration-300">
                    <Logo />
                </div>
            </div>
        </header>
    )
}