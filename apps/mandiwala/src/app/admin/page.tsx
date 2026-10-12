"use client";

import { useEffect, useState } from "react";
import { RedirectToSignIn, useUser, SignOutButton } from "@clerk/nextjs";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { Users, Calendar, CheckCircle, XCircle, LogOut } from "lucide-react";

interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  size: string;
  status: "pending" | "confirmed" | "declined";
  createdAt: any;
}

export default function AdminDashboard() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div className="min-h-screen bg-charcoal flex items-center justify-center text-gold-royal">Loading...</div>;
  if (!isSignedIn) return <RedirectToSignIn />;

  return (
    <div className="min-h-screen bg-charcoal text-charcoal-light font-plus-jakarta">
      <DashboardContent />
    </div>
  );
}

function DashboardContent() {
  const { user } = useUser();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "reservations"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reservation));
      setReservations(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (id: string, status: "confirmed" | "declined") => {
    try {
      await updateDoc(doc(db, "reservations", id), { status });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const pendingCount = reservations.filter(r => r.status === "pending").length;
  const todayDate = new Date().toISOString().split('T')[0];
  const todayCount = reservations.filter(r => r.date === todayDate).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center space-y-4 md:space-y-0 mb-12 border-b border-bronze pb-6">
        <div>
          <h1 className="font-cinzel text-3xl text-gold-royal uppercase tracking-widest">Admin Dashboard</h1>
          <p className="text-sm opacity-60 mt-1">Welcome back, {user?.firstName || "Admin"}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <SignOutButton>
            <button className="flex items-center space-x-2 px-4 py-2 bg-obsidian border border-bronze rounded-lg text-charcoal-light hover:text-red-400 hover:border-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </SignOutButton>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-obsidian border border-bronze p-6 rounded-xl flex items-center space-x-4">
          <div className="p-4 bg-charcoal rounded-full text-gold-royal">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm opacity-60 uppercase tracking-wider font-cinzel">Total Reservations</p>
            <p className="text-3xl font-bold mt-1 text-gold-light">{reservations.length}</p>
          </div>
        </div>
        <div className="bg-obsidian border border-bronze p-6 rounded-xl flex items-center space-x-4">
          <div className="p-4 bg-charcoal rounded-full text-gold-royal">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm opacity-60 uppercase tracking-wider font-cinzel">Today's Bookings</p>
            <p className="text-3xl font-bold mt-1 text-gold-light">{todayCount}</p>
          </div>
        </div>
        <div className="bg-obsidian border border-gold-royal/50 shadow-[0_0_15px_rgba(212,175,55,0.1)] p-6 rounded-xl flex items-center space-x-4">
          <div className="p-4 bg-charcoal rounded-full text-saffron">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm opacity-60 uppercase tracking-wider font-cinzel">Pending Action</p>
            <p className="text-3xl font-bold mt-1 text-saffron">{pendingCount}</p>
          </div>
        </div>
      </div>

      {/* Reservations List */}
      <div className="bg-obsidian border border-bronze rounded-xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-bronze">
          <h2 className="font-cinzel text-xl text-gold-royal tracking-widest uppercase">Recent Reservations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-charcoal text-xs uppercase tracking-wider text-charcoal-light/60">
                <th className="p-4 font-cinzel">Guest</th>
                <th className="p-4 font-cinzel">Contact</th>
                <th className="p-4 font-cinzel">Date & Time</th>
                <th className="p-4 font-cinzel">Size</th>
                <th className="p-4 font-cinzel">Status</th>
                <th className="p-4 font-cinzel text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-charcoal-light/50">Loading reservations...</td></tr>
              ) : reservations.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-charcoal-light/50">No reservations found.</td></tr>
              ) : (
                reservations.map(res => (
                  <tr key={res.id} className="border-b border-bronze/30 hover:bg-charcoal/50 transition-colors">
                    <td className="p-4 font-medium">{res.name}</td>
                    <td className="p-4 text-sm opacity-80">{res.phone}</td>
                    <td className="p-4 text-sm opacity-80">{res.date} at {res.time}</td>
                    <td className="p-4 text-sm opacity-80">{res.size}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${
                        res.status === 'confirmed' ? 'bg-green-900/50 text-green-400 border border-green-800' :
                        res.status === 'declined' ? 'bg-red-900/50 text-red-400 border border-red-800' :
                        'bg-saffron/20 text-saffron border border-saffron/50'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {res.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(res.id, 'confirmed')}
                            className="inline-flex items-center p-2 bg-obsidian border border-green-800 text-green-400 rounded hover:bg-green-900 transition-colors"
                            title="Confirm"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(res.id, 'declined')}
                            className="inline-flex items-center p-2 bg-obsidian border border-red-800 text-red-400 rounded hover:bg-red-900 transition-colors"
                            title="Decline"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Dynamic Menu Manager Setup (Placeholder for Cloudinary upload) */}
      <div className="mt-12 bg-obsidian border border-bronze rounded-xl overflow-hidden p-6 text-center">
        <h2 className="font-cinzel text-xl text-gold-royal tracking-widest uppercase mb-2">Menu Management</h2>
        <p className="text-sm text-charcoal-light/60 mb-6 max-w-2xl mx-auto">
          Add new menu items by uploading images to Cloudinary and syncing to Firestore.
        </p>
        <a href="/admin/menu" className="inline-block px-6 py-2 border border-gold-royal text-gold-royal rounded font-cinzel hover:bg-gold-royal hover:text-obsidian transition-colors">
          Manage Menu Items
        </a>
      </div>
    </div>
  );
}
