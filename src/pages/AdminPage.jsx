import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  Phone, MessageSquare, Search, RefreshCw, LogOut, CheckCircle2, 
  Clock, CheckCheck, XCircle, Trash2, Calendar, MapPin, 
  Baby, User, Lock, AlertCircle, Eye, EyeOff, Download, 
  Sparkles, Filter, ChevronDown, Check, ShieldCheck, ShieldAlert,
  Copy, ExternalLink, ArrowRight, Shield, AlertTriangle,
  QrCode, Smartphone, Key
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { API_BASE, getBackendConnectionErrorMessage } from '../utils/apiConfig';

// Inactivity timeout: 15 minutes of idle time automatically locks the session
const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000;

const STATUS_CONFIG = {
  NEW: { 
    label: 'New Lead', 
    badge: 'bg-amber-100/90 text-amber-900 border-amber-300',
    dot: 'bg-amber-500',
    cardBorder: 'border-amber-200/70',
    cardGlow: 'hover:shadow-amber-100/60'
  },
  CONTACTED: { 
    label: 'Contacted', 
    badge: 'bg-blue-100/90 text-blue-900 border-blue-300',
    dot: 'bg-blue-500',
    cardBorder: 'border-blue-200/70',
    cardGlow: 'hover:shadow-blue-100/60'
  },
  CONFIRMED: { 
    label: 'Confirmed', 
    badge: 'bg-emerald-100/90 text-emerald-900 border-emerald-300',
    dot: 'bg-emerald-500',
    cardBorder: 'border-emerald-200/70',
    cardGlow: 'hover:shadow-emerald-100/60'
  },
  COMPLETED: { 
    label: 'Completed', 
    badge: 'bg-purple-100/90 text-purple-900 border-purple-300',
    dot: 'bg-purple-500',
    cardBorder: 'border-purple-200/70',
    cardGlow: 'hover:shadow-purple-100/60'
  },
  CANCELLED: { 
    label: 'Cancelled', 
    badge: 'bg-stone-100 text-stone-700 border-stone-300',
    dot: 'bg-stone-400',
    cardBorder: 'border-stone-200',
    cardGlow: 'hover:shadow-stone-100'
  },
};

// Quick Note Preset Tags for 1-click addition
const NOTE_PRESETS = [
  '⏰ Morning Slot (10-11 AM)',
  '⏰ Afternoon Slot (3-4 PM)',
  '🏡 Home Visit Confirmed',
  '📞 Call back later today',
  '👶 Sensitive Skin / Coconut Oil',
  '✨ Twins / Extra Care',
];

// Helper to check JWT expiration
const isTokenExpired = (jwtToken) => {
  if (!jwtToken) return true;
  try {
    const payload = JSON.parse(atob(jwtToken.split('.')[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export default function AdminPage({ isLegacyRoute = false }) {
  const navigate = useNavigate();

  // Authentication State
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem('nidhi_admin_token') || '';
    if (isTokenExpired(saved)) {
      localStorage.removeItem('nidhi_admin_token');
      localStorage.removeItem('nidhi_admin_user');
      return '';
    }
    return saved;
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nidhi_admin_user') || 'null');
    } catch {
      return null;
    }
  });

  // Login form state & client rate limit protection
  const [loginEmail, setLoginEmail] = useState('nidhisbabymassage@gmail.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginTotp, setLoginTotp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  // Google Authenticator Setup Modal State
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [loadingQR, setLoadingQR] = useState(false);

  const handleOpen2FAModal = async () => {
    setShow2FAModal(true);
    if (!qrData) {
      setLoadingQR(true);
      try {
        const res = await fetch(`${API_BASE}/api/auth/2fa-setup`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (data.success) {
          setQrData(data);
        }
      } catch (err) {
        console.error('Failed to load 2FA info', err);
      } finally {
        setLoadingQR(false);
      }
    }
  };

  // Security features state
  const [privacyMode, setPrivacyMode] = useState(false); // Shoulder-surfing protection (masks phone & address)
  const [unmaskedIds, setUnmaskedIds] = useState(new Set()); // Per-card peek reveal
  const [sessionLockMsg, setSessionLockMsg] = useState('');
  const lastActivityRef = useRef(Date.now());

  // Dashboard state
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [noteDrafts, setNoteDrafts] = useState({});
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(new Date());
  const [activeWhatsAppModal, setActiveWhatsAppModal] = useState(null);

  // Toast notification bridge using react-hot-toast
  const showToast = (msg, type = 'success') => {
    if (type === 'error') {
      toast.error(msg);
    } else if (type === 'info') {
      toast(msg, { icon: 'ℹ️' });
    } else {
      toast.success(msg);
    }
  };

  // 1. Inactivity Session Auto-Lock (Security)
  useEffect(() => {
    if (!token) return;

    const resetActivity = () => {
      lastActivityRef.current = Date.now();
    };

    // User interaction listeners
    window.addEventListener('mousemove', resetActivity);
    window.addEventListener('mousedown', resetActivity);
    window.addEventListener('keydown', resetActivity);
    window.addEventListener('touchstart', resetActivity);
    window.addEventListener('scroll', resetActivity);

    // Periodic check every 15 seconds
    const interval = setInterval(() => {
      if (Date.now() - lastActivityRef.current > INACTIVITY_TIMEOUT_MS) {
        handleLogout('Session auto-locked due to 15 minutes of inactivity to protect client privacy.');
      }
    }, 15000);

    return () => {
      window.removeEventListener('mousemove', resetActivity);
      window.removeEventListener('mousedown', resetActivity);
      window.removeEventListener('keydown', resetActivity);
      window.removeEventListener('touchstart', resetActivity);
      window.removeEventListener('scroll', resetActivity);
      clearInterval(interval);
    };
  }, [token]);

  // Lockout countdown timer for client brute-force guard
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  // 2. Fetch Enquiries
  const fetchEnquiries = useCallback(async (isSilent = false) => {
    if (!token) return;
    if (isTokenExpired(token)) {
      handleLogout('Session expired. Please log in again.');
      return;
    }

    if (!isSilent) setLoading(true);
    setDashboardError('');

    try {
      const url = new URL(`${API_BASE}/api/enquiries`);
      if (statusFilter !== 'ALL') url.searchParams.set('status', statusFilter);
      if (searchQuery.trim()) url.searchParams.set('q', searchQuery.trim());
      url.searchParams.set('limit', '100');

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 401) {
        handleLogout('Session expired or unauthorized. Please re-authenticate.');
        return;
      }

      const json = await res.json();
      if (json.success) {
        setEnquiries(json.data || []);
        setLastRefreshedAt(new Date());
      } else {
        setDashboardError(json.message || 'Unable to load enquiries.');
      }
    } catch {
      setDashboardError(getBackendConnectionErrorMessage());
    } finally {
      if (!isSilent) setLoading(false);
    }
  }, [token, statusFilter, searchQuery]);

  useEffect(() => {
    if (token) {
      fetchEnquiries();
    }
  }, [fetchEnquiries, token]);

  // Auto-polling every 30 seconds
  useEffect(() => {
    if (!token || !autoRefresh) return;
    const interval = setInterval(() => {
      fetchEnquiries(true);
    }, 30000);
    return () => clearInterval(interval);
  }, [token, autoRefresh, fetchEnquiries]);

  // 3. Handle Login with Security Protections
  const handleLogin = async (e) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    setLoginLoading(true);
    setLoginError('');
    setSessionLockMsg('');

    try {
      const cleanEmail = loginEmail.trim().toLowerCase();
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: cleanEmail, 
          password: loginPassword,
          totpCode: loginTotp.trim()
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('nidhi_admin_token', data.token);
        localStorage.setItem('nidhi_admin_user', JSON.stringify(data.admin));
        setToken(data.token);
        setAdminUser(data.admin);
        setFailedAttempts(0);
        lastActivityRef.current = Date.now();
        toast.success('Welcome back, Nidhi! 🌸');
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        const err = nextAttempts >= 4 
          ? 'Too many failed attempts. Security cooldown active (30s).' 
          : (data.message || 'Invalid credentials or Google Authenticator code.');
        setLoginError(err);
        toast.error(err);
      }
    } catch {
      const err = getBackendConnectionErrorMessage();
      setLoginError(err);
      toast.error(err);
    } finally {
      setLoginLoading(false);
    }
  };

  // 4. Handle Logout (Secure purge)
  const handleLogout = (reason = '') => {
    localStorage.removeItem('nidhi_admin_token');
    localStorage.removeItem('nidhi_admin_user');
    setToken('');
    setAdminUser(null);
    setEnquiries([]);
    if (reason) {
      setSessionLockMsg(reason);
      toast.error(reason, { icon: '🔒' });
    } else {
      toast('Signed out securely', { icon: '👋' });
    }
  };

  // 5. In-Place Status Update
  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/api/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
        );
        toast.success(`Status updated to ${STATUS_CONFIG[newStatus]?.label || newStatus}`);
      } else {
        toast.error('Failed to update status on server.');
      }
    } catch {
      toast.error('Network error updating status.');
    }
  };

  // 6. Save Internal Private Notes
  const handleSaveNotes = async (enquiryId) => {
    const draft = noteDrafts[enquiryId] ?? '';
    try {
      const res = await fetch(`${API_BASE}/api/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ internalNotes: draft }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiryId ? { ...e, internalNotes: draft } : e))
        );
        setEditingNotesId(null);
        toast.success('Private clinic note saved');
      } else {
        toast.error('Failed to save note on server.');
      }
    } catch {
      toast.error('Network error saving note.');
    }
  };

  // 7. Delete Enquiry
  const handleDelete = async (enquiryId, parentName) => {
    if (!window.confirm(`Permanently delete enquiry from "${parentName}"?`)) return;

    try {
      const res = await fetch(`${API_BASE}/api/enquiries/${enquiryId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== enquiryId));
        toast.success('Enquiry record deleted');
      } else {
        toast.error('Failed to delete enquiry.');
      }
    } catch {
      toast.error('Network error deleting enquiry.');
    }
  };

  // 8. Privacy Masking Helpers (Shoulder-surfing protection)
  const togglePeek = (id) => {
    setUnmaskedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const maskPhone = (phone, id) => {
    if (!privacyMode || unmaskedIds.has(id)) return phone;
    const clean = phone.replace(/\D/g, '');
    if (clean.length >= 10) {
      return `${clean.slice(0, 2)}•••• ••${clean.slice(-2)}`;
    }
    return '••••••••••';
  };

  const maskAddress = (addr, id) => {
    if (!privacyMode || unmaskedIds.has(id)) return addr;
    const parts = addr.split(',');
    if (parts.length > 1) {
      return `••••, ${parts[parts.length - 1].trim()}`;
    }
    return '••••••••••••';
  };

  // 9. Quick WhatsApp Message Templates
  const getWhatsAppURL = (enquiry, templateType = 'CONFIRM_DATE') => {
    const cleanPhone = enquiry.phone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    const formattedDate = new Date(enquiry.preferredDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    let msg = '';
    if (templateType === 'CONFIRM_DATE') {
      msg = 
        `Hello ${enquiry.parentName} ji! 🌸\n\n` +
        `This is Nidhi from *Nidhi's Baby Massage Indore*.\n\n` +
        `Thank you for your enquiry (Ref #${enquiry.id.slice(0, 8)}) for baby massage (${enquiry.babyAgeGroup}).\n` +
        `I would love to confirm your preferred session for *${formattedDate}*.\n\n` +
        `What time slot would suit your baby's sleep and feeding routine best?`;
    } else if (templateType === 'TIME_SLOT') {
      msg = 
        `Hello ${enquiry.parentName} ji! 🌸\n\n` +
        `Regarding your baby massage session (*${formattedDate}*):\n` +
        `Our available morning slots in your area are:\n` +
        `• 10:00 AM - 11:00 AM\n` +
        `• 11:30 AM - 12:30 PM\n\n` +
        `Please let me know which time is most comfortable for your little one.`;
    } else {
      msg = 
        `Hello ${enquiry.parentName} ji! 🌸\n\n` +
        `Your baby massage session is confirmed for *${formattedDate}* at your address:\n` +
        `📍 ${enquiry.address || [enquiry.unitNo, enquiry.society, enquiry.locality].filter(Boolean).join(', ')}\n\n` +
        `💡 *Quick Parent Tip*: Please feed your baby 30 to 45 minutes before the session so the baby is calm and settled.\n\n` +
        `Looking forward to meeting your baby!`;
    }

    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(msg)}`;
  };

  // 10. Copy Client Details to Clipboard
  const handleCopyDetails = (item) => {
    const text = 
      `Baby Massage Client Details:\n` +
      `Parent: ${item.parentName}\n` +
      `Phone: +91 ${item.phone}\n` +
      `Baby Age: ${item.babyAgeGroup}\n` +
      `Preferred Date: ${new Date(item.preferredDate).toLocaleDateString('en-IN')}\n` +
      `Address: ${item.address || [item.unitNo, item.society, item.locality].filter(Boolean).join(', ')}\n` +
      (item.additionalMessage ? `Parent Note: "${item.additionalMessage}"\n` : '') +
      `Status: ${item.status}`;

    navigator.clipboard.writeText(text);
    showToast('Client details copied to clipboard');
  };

  // 11. Export to CSV for bookkeeping
  const handleExportCSV = () => {
    if (!enquiries.length) return;
    const headers = ['Ref ID', 'Created At', 'Parent Name', 'Phone', 'Baby Age', 'Preferred Date', 'Address', 'Status', 'Notes'];
    const rows = enquiries.map((e) => [
      `#${e.id.slice(0, 8)}`,
      new Date(e.createdAt).toLocaleString('en-IN'),
      `"${e.parentName}"`,
      `"${e.phone}"`,
      `"${e.babyAgeGroup}"`,
      new Date(e.preferredDate).toLocaleDateString('en-IN'),
      `"${e.address || [e.unitNo, e.society, e.locality].filter(Boolean).join(', ')}"`,
      e.status,
      `"${(e.internalNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nidhi-baby-massage-enquiries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV file');
  };

  // Metrics
  const stats = useMemo(() => {
    const total = enquiries.length;
    const newCount = enquiries.filter((e) => e.status === 'NEW').length;
    const contacted = enquiries.filter((e) => e.status === 'CONTACTED').length;
    const confirmed = enquiries.filter((e) => e.status === 'CONFIRMED').length;
    const completed = enquiries.filter((e) => e.status === 'COMPLETED').length;
    return { total, newCount, contacted, confirmed, completed };
  }, [enquiries]);

  // LOGIN VIEW
  if (!token) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#FFF5F6] via-[#FAF7F2] to-[#FAF5EE] text-[#2D1E1A] flex items-center justify-center p-4">
        {/* Soft Ambient Warm Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#FFCED8]/50 via-[#FFDDDD]/30 to-transparent rounded-full pointer-events-none -z-10 blur-3xl opacity-70" />

        <div className="max-w-sm w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-lg border border-[#F0E5DF] p-6 sm:p-8 space-y-5">
          
          <div className="text-center space-y-1">
            <span className="font-huglove text-2xl sm:text-3xl tracking-wide text-[#2D1E1A] block">
              Nidhi's <span className="text-[#D96B82]">Baby Massage</span>
            </span>
            <p className="text-xs text-[#8C7469]">Sign in with Password & Authenticator</p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-[#2D1E1A] mb-1">Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="nidhisbabymassage@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CBC3] focus:outline-none focus:ring-2 focus:ring-[#D96B82]/20 focus:border-[#D96B82] bg-white text-[#2D1E1A] transition-all"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#2D1E1A] mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CBC3] focus:outline-none focus:ring-2 focus:ring-[#D96B82]/20 focus:border-[#D96B82] bg-white text-[#2D1E1A] pr-10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#2D1E1A] mb-1">Google Authenticator Code</label>
              <input
                type="text"
                required
                maxLength={6}
                value={loginTotp}
                onChange={(e) => setLoginTotp(e.target.value.replace(/\D/g, ''))}
                placeholder="6-digit code"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CBC3] focus:outline-none focus:ring-2 focus:ring-[#D96B82]/20 focus:border-[#D96B82] bg-white text-[#2D1E1A] text-center font-mono tracking-widest text-base font-bold transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading || lockoutSeconds > 0}
              className="w-full bg-[#FFDDDD] hover:bg-[#F2AEBA] text-[#2D1E1A] font-bold py-2.5 rounded-full transition-all shadow-xs hover:shadow active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : lockoutSeconds > 0 ? (
                <span>Wait {lockoutSeconds}s</span>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // COMFORTABLE DASHBOARD VIEW
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D1E1A] flex flex-col font-sans relative selection:bg-[#FFDDDD]">
      {/* Top Header - Comfortable, Clean, Security Enhanced */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#EADFD8] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-3">
          
          {/* Logo & Portal Status */}
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#FFF0F3] text-[#D96B82] border border-[#FFCED8] font-huglove text-xl font-bold flex items-center justify-center shadow-2xs shrink-0">
              N
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-huglove text-base sm:text-xl tracking-wide text-[#2D1E1A] leading-tight">
                  Nidhi's <span className="text-[#D96B82]">Care Portal</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold bg-[#E8F8EE] text-[#1B6F3E] border border-[#BCE8CA] px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Secure Mode</span>
                </span>
              </div>
              <div className="text-[11px] text-[#7A635A] flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Feed</span>
                <span className="text-stone-300">•</span>
                <span className="text-[10px] text-stone-500">Auto-lock in 15m idle</span>
              </div>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Shoulder-Surfing Privacy Shield Toggle */}
            <button
              onClick={() => {
                setPrivacyMode(!privacyMode);
                showToast(privacyMode ? 'Privacy shield off (Full view)' : 'Privacy shield on (Masked numbers)');
              }}
              title={privacyMode ? 'Disable Privacy Shield' : 'Enable Privacy Shield (Mask phone numbers & addresses)'}
              className={`text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                privacyMode 
                  ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs' 
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              {privacyMode ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5 text-stone-500" />}
              <span className="hidden sm:inline">Privacy Shield</span>
            </button>

            {/* Manual Sync */}
            <button
              onClick={async () => {
                await fetchEnquiries(false);
                toast.success('Enquiries refreshed', { icon: '🔄' });
              }}
              disabled={loading}
              title="Refresh Enquiries"
              className="p-2 rounded-full border border-[#EADFD8] hover:bg-[#FAF7F2] text-[#2D1E1A] transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#D96B82]' : ''}`} />
            </button>

            {/* Google Authenticator 2FA Setup (Only accessible when logged in) */}
            <button
              onClick={handleOpen2FAModal}
              title="View Google Authenticator 2FA QR Code"
              className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 px-2.5 sm:px-3 py-1.5 rounded-full transition-all"
            >
              <QrCode className="w-3.5 h-3.5 text-[#D96B82]" />
              <span className="hidden md:inline">2FA Setup</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              title="Download Excel / CSV"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D1E1A] bg-white hover:bg-stone-50 border border-[#D8CBC3] px-3 py-1.5 rounded-full shadow-2xs transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#D96B82]" />
              <span className="hidden md:inline">Export</span>
            </button>

            {/* Logout */}
            <button
              onClick={() => handleLogout()}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-full transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Comfortable Workspace */}
      <main className="max-w-7xl w-full mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6 flex-1">

        {/* Comfortable Metric Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Total */}
          <div 
            onClick={() => setStatusFilter('ALL')}
            className={`cursor-pointer bg-white rounded-3xl p-4 sm:p-5 border transition-all ${
              statusFilter === 'ALL' ? 'border-[#D96B82] shadow-md ring-2 ring-[#D96B82]/20' : 'border-[#EADFD8] hover:border-stone-400 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#7A635A] uppercase tracking-wider">Total Enquiries</span>
              <span className="w-2 h-2 rounded-full bg-stone-300"></span>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#2D1E1A] mt-1 block">{stats.total}</span>
            <span className="text-[11px] text-[#8C7469] mt-0.5 block">All time booking leads</span>
          </div>

          {/* New Leads */}
          <div 
            onClick={() => setStatusFilter('NEW')}
            className={`cursor-pointer bg-[#FFF8EE] rounded-3xl p-4 sm:p-5 border transition-all ${
              statusFilter === 'NEW' ? 'border-amber-400 shadow-md ring-2 ring-amber-300/40' : 'border-amber-200 hover:border-amber-300 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">New Leads</span>
              {stats.newCount > 0 ? (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-amber-300"></span>
              )}
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-900 mt-1 block">{stats.newCount}</span>
            <span className="text-[11px] text-amber-800 font-medium mt-0.5 block">
              {stats.newCount > 0 ? 'Requires attention & response' : 'All leads contacted!'}
            </span>
          </div>

          {/* Confirmed Sessions */}
          <div 
            onClick={() => setStatusFilter('CONFIRMED')}
            className={`cursor-pointer bg-[#EAF7EE] rounded-3xl p-4 sm:p-5 border transition-all ${
              statusFilter === 'CONFIRMED' ? 'border-emerald-400 shadow-md ring-2 ring-emerald-300/40' : 'border-emerald-200 hover:border-emerald-300 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Confirmed</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-900 mt-1 block">{stats.confirmed}</span>
            <span className="text-[11px] text-emerald-800 font-medium mt-0.5 block">Scheduled Indore visits</span>
          </div>

          {/* Completed */}
          <div 
            onClick={() => setStatusFilter('COMPLETED')}
            className={`cursor-pointer bg-[#F5EFFB] rounded-3xl p-4 sm:p-5 border transition-all ${
              statusFilter === 'COMPLETED' ? 'border-purple-400 shadow-md ring-2 ring-purple-300/40' : 'border-purple-200 hover:border-purple-300 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">Completed</span>
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-900 mt-1 block">{stats.completed}</span>
            <span className="text-[11px] text-purple-800 font-medium mt-0.5 block">Delivered with care</span>
          </div>
        </div>

        {/* Comfortable Search & Quick Filter Pills */}
        <div className="bg-white rounded-3xl p-4 border border-[#EADFD8] shadow-2xs space-y-3">
          
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search by parent name, baby age, phone, Vijay Nagar, Palasia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-[#D8CBC3] focus:outline-none focus:ring-2 focus:ring-[#D96B82]/20 focus:border-[#D96B82] bg-white text-[#2D1E1A] placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>

            {/* Quick Status Filter Tabs with Counts */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs font-bold scrollbar-none">
              {[
                { key: 'ALL', label: 'All', count: stats.total },
                { key: 'NEW', label: 'New Leads', count: stats.newCount, isHighlight: stats.newCount > 0 },
                { key: 'CONTACTED', label: 'Contacted', count: stats.contacted },
                { key: 'CONFIRMED', label: 'Confirmed', count: stats.confirmed },
                { key: 'COMPLETED', label: 'Completed', count: stats.completed },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setStatusFilter(item.key)}
                  className={`px-3.5 py-2 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    statusFilter === item.key
                      ? 'bg-[#2D1E1A] text-white shadow-2xs'
                      : item.isHighlight
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200/80'
                      : 'bg-[#FAF7F2] text-[#634E45] border border-[#EADFD8] hover:bg-[#FFF0F3]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    statusFilter === item.key ? 'bg-white/20 text-white' : 'bg-stone-200/70 text-[#2D1E1A]'
                  }`}>
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {dashboardError && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm rounded-2xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{dashboardError}</span>
          </div>
        )}

        {/* Enquiry Cards List */}
        {loading && enquiries.length === 0 ? (
          <div className="p-16 text-center text-[#7A635A] space-y-3 bg-white rounded-3xl border border-[#EADFD8]">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#D96B82]" />
            <p className="text-sm font-semibold">Synchronizing with Secure Cloud Database...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#EADFD8] p-16 text-center text-[#7A635A] space-y-2">
            <Clock className="w-10 h-10 mx-auto text-[#D96B82] opacity-40" />
            <p className="text-base font-bold text-[#2D1E1A]">No enquiries found</p>
            <p className="text-xs text-[#8C7469]">No records match the current filter "{statusFilter}" or search keyword.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((item) => {
              const isEditing = editingNotesId === item.id;
              const draftNote = noteDrafts[item.id] ?? (item.internalNotes || '');
              const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.NEW;
              const formattedPreferredDate = new Date(item.preferredDate).toLocaleDateString('en-IN', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });
              const formattedCreated = new Date(item.createdAt).toLocaleString('en-IN', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl border ${statusCfg.cardBorder} p-4 sm:p-6 shadow-2xs hover:shadow-md transition-all space-y-4 relative`}
                >
                  {/* Card Header Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F4EAE6]">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#2D1E1A] bg-[#FAF7F2] px-2.5 py-1 rounded-xl border border-[#EADFD8]">
                        #{item.id.slice(0, 8)}
                      </span>
                      <span className="text-xs text-[#8C7469] font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>Received {formattedCreated}</span>
                      </span>
                    </div>

                    {/* Status Pill & Fast Switcher */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#8C7469] hidden sm:inline">Status:</span>
                      
                      <div className="relative inline-block">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`text-xs font-bold py-1.5 px-3.5 rounded-full border cursor-pointer focus:outline-none appearance-none pr-8 transition-all ${statusCfg.badge}`}
                        >
                          <option value="NEW">NEW LEAD</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                      </div>
                    </div>
                  </div>

                  {/* Core Customer & Baby Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-xs sm:text-sm">
                    
                    {/* Parent & Contact */}
                    <div className="space-y-1 bg-[#FFFDFB] p-3 rounded-2xl border border-[#F4EAE6]">
                      <div className="text-[11px] font-bold text-[#8C7469] uppercase tracking-wider flex items-center justify-between">
                        <span>Parent / Contact</span>
                        {privacyMode && (
                          <button
                            onClick={() => togglePeek(item.id)}
                            title="Peek unmask"
                            className="text-[10px] text-[#D96B82] hover:underline"
                          >
                            {unmaskedIds.has(item.id) ? 'Hide' : 'Reveal'}
                          </button>
                        )}
                      </div>
                      <div className="font-bold text-[#2D1E1A] text-base flex items-center gap-1.5">
                        <User className="w-4 h-4 text-[#D96B82]" />
                        <span>{item.parentName}</span>
                      </div>
                      <div className="text-[#5C453E] font-semibold text-xs">
                        <a href={`tel:${item.phone}`} className="hover:text-[#D96B82] hover:underline font-mono">
                          +91 {maskPhone(item.phone, item.id)}
                        </a>
                      </div>
                    </div>

                    {/* Baby Age & Booking Date */}
                    <div className="space-y-1 bg-[#FFFDFB] p-3 rounded-2xl border border-[#F4EAE6]">
                      <div className="text-[11px] font-bold text-[#8C7469] uppercase tracking-wider">
                        Baby & Date
                      </div>
                      <div className="text-[#2D1E1A] font-bold text-base flex items-center gap-1.5">
                        <Baby className="w-4 h-4 text-amber-600" />
                        <span>{item.babyAgeGroup}</span>
                      </div>
                      <div className="text-[#5C453E] font-medium text-xs flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D96B82]" />
                        <span>Preferred: <strong>{formattedPreferredDate}</strong></span>
                      </div>
                    </div>

                    {/* Indore Address */}
                    <div className="space-y-1 bg-[#FFFDFB] p-3 rounded-2xl border border-[#F4EAE6]">
                      <div className="text-[11px] font-bold text-[#8C7469] uppercase tracking-wider">
                        Indore Service Address
                      </div>
                      <div className="text-[#2D1E1A] font-medium text-xs flex items-start gap-1.5 leading-snug">
                        <MapPin className="w-4 h-4 text-[#D96B82] shrink-0 mt-0.5" />
                        <span>
                          {maskAddress(
                            item.address || [item.unitNo, item.society, item.locality].filter(Boolean).join(', '),
                            item.id
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer's Special Message */}
                  {item.additionalMessage && (
                    <div className="p-3 bg-[#FFF8EE] border border-[#F0DDC9] rounded-2xl text-xs text-[#5C453E]">
                      <strong className="text-[#2D1E1A] font-bold">Parent's Special Note: </strong>
                      <span>"{item.additionalMessage}"</span>
                    </div>
                  )}

                  {/* Private Clinic Notes & Preset Tags */}
                  <div className="text-xs space-y-2 pt-1">
                    {isEditing ? (
                      <div className="space-y-2 bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EADFD8]">
                        <div className="flex items-center justify-between">
                          <label className="font-bold text-[#2D1E1A] text-xs">Private Clinic Notes (Staff Only):</label>
                          <span className="text-[11px] text-stone-500">Click tags below to append quickly</span>
                        </div>

                        {/* Quick Preset Tag Chips */}
                        <div className="flex flex-wrap gap-1.5">
                          {NOTE_PRESETS.map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => {
                                const current = draftNote.trim();
                                const updated = current ? `${current} | ${preset}` : preset;
                                setNoteDrafts({ ...noteDrafts, [item.id]: updated });
                              }}
                              className="text-[11px] bg-white hover:bg-[#FFDDDD]/50 border border-[#D8CBC3] px-2.5 py-1 rounded-full text-[#4A3831] transition-all"
                            >
                              + {preset}
                            </button>
                          ))}
                        </div>

                        <textarea
                          rows={2}
                          value={draftNote}
                          onChange={(e) =>
                            setNoteDrafts({ ...noteDrafts, [item.id]: e.target.value })
                          }
                          placeholder="Type internal staff notes (e.g. Call back at 4 PM, prefers morning 10 AM, baby sensitive skin)..."
                          className="w-full p-2.5 border border-[#D8CBC3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D96B82]/20 focus:border-[#D96B82] bg-white text-[#2D1E1A] text-xs"
                        />

                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="px-3 py-1.5 text-xs text-[#7A635A] hover:bg-stone-100 rounded-full font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveNotes(item.id)}
                            className="px-4 py-1.5 text-xs bg-[#2D1E1A] text-white rounded-full font-bold hover:bg-black transition-all shadow-xs"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-[#FAF7F2] p-2.5 sm:p-3 rounded-2xl border border-[#EADFD8]">
                        <div className="text-[11px] sm:text-xs">
                          <strong className="text-[#8C7469] font-bold">Staff Notes: </strong>
                          <span className="text-[#2D1E1A] font-medium">{item.internalNotes || 'No notes added yet.'}</span>
                        </div>
                        <button
                          onClick={() => {
                            setNoteDrafts({ ...noteDrafts, [item.id]: item.internalNotes || '' });
                            setEditingNotesId(item.id);
                          }}
                          className="text-xs font-bold text-[#D96B82] hover:underline ml-2 shrink-0 bg-white border border-[#FFCED8] px-2.5 py-1 rounded-full shadow-2xs"
                        >
                          {item.internalNotes ? 'Edit Notes' : '+ Add Note'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Bar: Comfortable Touch Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-[#F4EAE6]">
                    
                    {/* Primary Communication & Quick Progressors */}
                    <div className="flex flex-wrap items-center gap-2">
                      
                      {/* WhatsApp Dropdown / Fast Send */}
                      <a
                        href={getWhatsAppURL(item, 'CONFIRM_DATE')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#146633] bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 px-3.5 py-2 rounded-full transition-all shadow-2xs active:scale-[0.98]"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>WhatsApp Parent</span>
                      </a>

                      {/* Direct Phone Call */}
                      <a
                        href={`tel:${item.phone}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D1E1A] bg-white hover:bg-stone-50 border border-[#D8CBC3] px-3.5 py-2 rounded-full shadow-2xs transition-all active:scale-[0.98]"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#D96B82]" />
                        <span>Call +91 {maskPhone(item.phone, item.id)}</span>
                      </a>

                      {/* Copy Details */}
                      <button
                        onClick={() => handleCopyDetails(item)}
                        title="Copy details to clipboard"
                        className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 bg-white hover:bg-stone-50 border border-[#D8CBC3] px-3 py-2 rounded-full shadow-2xs transition-all"
                      >
                        <Copy className="w-3.5 h-3.5 text-stone-400" />
                        <span className="hidden sm:inline">Copy Info</span>
                      </button>

                      {/* Quick 1-Click Status Step Progressor */}
                      {item.status === 'NEW' && (
                        <button
                          onClick={() => handleStatusChange(item.id, 'CONTACTED')}
                          className="inline-flex items-center gap-1 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-300 px-3 py-2 rounded-full transition-all"
                        >
                          <Check className="w-3.5 h-3.5 text-blue-600" />
                          <span>Mark Contacted</span>
                        </button>
                      )}

                      {item.status === 'CONTACTED' && (
                        <button
                          onClick={() => handleStatusChange(item.id, 'CONFIRMED')}
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-2 rounded-full transition-all"
                        >
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Confirm Booking</span>
                        </button>
                      )}

                      {item.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleStatusChange(item.id, 'COMPLETED')}
                          className="inline-flex items-center gap-1 text-xs font-bold text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-300 px-3 py-2 rounded-full transition-all"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          <span>Mark Completed</span>
                        </button>
                      )}
                    </div>

                    {/* Delete Enquiry */}
                    <button
                      onClick={() => handleDelete(item.id, item.parentName)}
                      className="text-stone-400 hover:text-rose-600 p-2 rounded-full hover:bg-rose-50 transition-all"
                      title="Permanently remove enquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Google Authenticator QR Code Setup Modal (Authenticated Only) */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-xs w-full bg-white rounded-3xl p-5 shadow-2xl border border-[#EADFD8] text-center space-y-3.5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="font-bold text-sm text-[#2D1E1A]">Google Authenticator Setup</span>
              <button
                onClick={() => setShow2FAModal(false)}
                className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 hover:text-black flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {loadingQR ? (
              <div className="py-8 space-y-2 text-[#7A635A]">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#D96B82]" />
                <p className="text-xs">Generating QR Code...</p>
              </div>
            ) : qrData ? (
              <div className="space-y-3">
                <p className="text-xs text-[#7A635A]">
                  Scan in <strong>Google Authenticator</strong> app on your phone:
                </p>
                
                {qrData.qrCodeDataUrl && (
                  <img
                    src={qrData.qrCodeDataUrl}
                    alt="Google Authenticator QR Code"
                    className="w-48 h-48 mx-auto rounded-2xl border border-[#EADFD8] p-1.5 bg-white shadow-xs"
                  />
                )}

                <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EADFD8] text-left space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#8C7469] block">Manual Entry Key:</span>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-xs font-bold text-[#2D1E1A] break-all select-all">
                      {qrData.secretKey}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(qrData.secretKey);
                        toast.success('Secret key copied');
                      }}
                      className="text-[11px] font-bold text-[#D96B82] hover:underline shrink-0 ml-1"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-rose-600">{getBackendConnectionErrorMessage()}</p>
            )}

            <button
              type="button"
              onClick={() => setShow2FAModal(false)}
              className="w-full bg-[#2D1E1A] text-white text-xs font-bold py-2 rounded-full hover:bg-black transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
