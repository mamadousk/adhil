type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

// Keep all content visible in the initial HTML, even before hydration.
export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
