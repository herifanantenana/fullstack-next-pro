import Link from "next/link";
import { Button } from "../ui/button";
import { AuthButton } from "./auth-button";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
	{ label: "Home", href: "/" },
	{ label: "Blog", href: "/blog" },
	{ label: "Create", href: "/create" },
];

export function Navbar() {
	return (
		<header className="flex w-full items-center justify-between border py-5">
			<nav className="flex items-center gap-x-8 border">
				<Link href="/" className="text-3xl font-bold">
					Next<span className="text-blue-500">Pro</span>
				</Link>

				<ul className="flex gap-x-2 border">
					{LINKS.map(({ href, label }) => (
						<li key={href}>
							<Button variant="ghost" asChild>
								<Link href={href}>{label}</Link>
							</Button>
						</li>
					))}
				</ul>
			</nav>

			<div className="flex items-center gap-x-2 border">
				<AuthButton />
				<ThemeToggle />
			</div>
		</header>
	);
}
