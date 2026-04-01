import { Link } from "react-router-dom";

interface AuthNavigationProps {
  text: string;
  linkText: string;
  to: string;
}

export const AuthNavigation = ({ text, linkText, to }: AuthNavigationProps) => (
  <div className="mt-6 text-center text-sm text-muted-foreground border-t pt-4">
    {text}{" "}
    <Link to={to} className="text-primary hover:underline font-medium">
      {linkText}
    </Link>
  </div>
);