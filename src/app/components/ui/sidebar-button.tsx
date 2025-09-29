export default function SidebarButton({ href, name }: { href: string, name: string }) {
    return (
        <a href={href} className="opacity-45 hover:opacity-100 transition-opacity duration-300">
            {name}
        </a>
    );
}