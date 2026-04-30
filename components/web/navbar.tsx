import Link from "next/link";
import { buttonVariants } from "../ui/button";
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
							<Link
								href={href}
								className={buttonVariants({ variant: "ghost" })}
							>
								{label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<div className="flex items-center gap-x-2 border">
				<Link
					href="/auth/sign-up"
					className={buttonVariants({ variant: "default" })}
				>
					Sign up
				</Link>
				<Link
					href="/auth/login"
					className={buttonVariants({ variant: "secondary" })}
				>
					Login
				</Link>
				<ThemeToggle />
			</div>
		</header>
	);
}
