export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Diensten", href: "/diensten" },
  { label: "Projecten", href: "/projecten" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
];
