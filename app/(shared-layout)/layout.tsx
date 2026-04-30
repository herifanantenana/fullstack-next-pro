import { Navbar } from "@/components/web/navbar";

export default function SharedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="border-foreground/30 border">
			<Navbar />
			{children}
		</div>
	);
}
