import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthButton } from "./auth-button";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
	{ label: "Home", href: "/" },
	{ label: "Post", href: "/post" },
	{ label: "Create", href: "/create" },
];

export function Navbar() {
	return (
		<header className="flex w-full items-center justify-between py-5">
			<nav className="flex items-center gap-x-8">
				<Link href="/" className="text-3xl font-bold">
					Next<span className="text-primary">Pro</span>
				</Link>

				<ul className="flex gap-x-2">
					{LINKS.map(({ href, label }) => (
						<li key={href}>
							<Button variant="ghost" asChild>
								<Link href={href}>{label}</Link>
							</Button>
						</li>
					))}
				</ul>
			</nav>

			<div className="flex items-center gap-x-2">
				<AuthButton />
				<ThemeToggle />
			</div>
		</header>
	);
}
