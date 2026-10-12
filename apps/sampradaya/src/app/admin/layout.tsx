import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, LogOut, UtensilsCrossed } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isPlaceholderKey =
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("pk_test_x");

  const Sidebar = () => (
    <div className="w-64 bg-white border-r h-full flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b flex items-center gap-2">
        <UtensilsCrossed className="text-primary" />
        <span className="font-bold text-lg font-serif">Sampradaya</span>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors w-full"
        >
          <LogOut size={20} />
          Exit Admin
        </Link>
      </div>
    </div>
  );

  const LayoutContent = () => (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">{children}</div>
    </div>
  );

  if (isPlaceholderKey) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-yellow-50 border-b border-yellow-200 p-4 text-center text-yellow-800 text-sm flex justify-center items-center gap-4 z-50 relative">
          <strong>Development Mode:</strong> Clerk Authentication is bypassed because API keys are placeholders.
        </div>
        <LayoutContent />
      </div>
    );
  }

  return (
    <ClerkProvider>
      <SignedIn>
        <LayoutContent />
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <SignIn routing="hash" />
        </div>
      </SignedOut>
    </ClerkProvider>
  );
}
