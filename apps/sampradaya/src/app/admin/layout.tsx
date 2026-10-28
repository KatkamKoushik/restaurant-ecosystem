import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, LogOut, UtensilsCrossed } from "lucide-react";

function Sidebar() {
  return (
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
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">{children}</div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isPlaceholderKey =
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("pk_test_x");

  if (isPlaceholderKey) {
    if (process.env.NODE_ENV === "production") {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border border-red-200 rounded-xl p-8 text-center shadow-lg">
            <h1 className="text-2xl font-serif text-red-600 mb-2">Access Denied</h1>
            <p className="text-gray-600 text-sm mb-4">
              Authentication is not configured for production. Admin access is disabled.
            </p>
            <Link href="/" className="text-primary hover:underline text-sm font-medium">
              Return to Website
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-yellow-50 border-b border-yellow-200 p-4 text-center text-yellow-800 text-sm flex justify-center items-center gap-4 z-50 relative">
          <strong>Development Mode:</strong> Clerk Authentication is bypassed because API keys are placeholders.
        </div>
        <AdminShell>{children}</AdminShell>
      </div>
    );
  }

  return (
    <ClerkProvider>
      <SignedIn>
        <AdminShell>{children}</AdminShell>
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <SignIn routing="hash" />
        </div>
      </SignedOut>
    </ClerkProvider>
  );
}
