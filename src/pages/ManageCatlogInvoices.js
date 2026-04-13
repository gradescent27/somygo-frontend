import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  User,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Package,
  TrendingUp,
  Settings,
  Zap,
  Building,
  Plus,
  Trash2,
  Save,
  ToggleLeft,
  ToggleRight,
  LogOut,
} from "lucide-react";
import { apiService } from "../config/api";

const ADMIN_PASSWORD = "PASSword123$";

const ManageCatlogInvoices = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("invoices"); // 'invoices' | 'settings'

  // Invoice state
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    invoiceId: "all",
    search: "",
  });
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [stats, setStats] = useState({
    customers: 0,
    totalAttempts: 0,
    totalPaid: 0,
    totalRevenue: 0,
    awaitingPayment: 0,
    automationSuccess: 0,
    automationFailed: 0,
    processing: 0,
    revenueByInvoice: {},
  });

  // Settings state
  const [settings, setSettings] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchInvoices();
    } else {
      alert("Incorrect password");
    }
  };

  // ── Invoice functions ──────────────────────────────────────────────────

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const options = {
        status: filters.status !== "all" ? filters.status : undefined,
        invoiceId: filters.invoiceId !== "all" ? filters.invoiceId : undefined,
        search: filters.search || undefined,
        limit: 100,
      };
      const response = await apiService.getCatalogPaymentRequests(options);
      if (response.success) {
        setInvoices(response.data.requests);
        calculateStats(response.data.requests);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    let totalAttempts = 0;
    let totalPaid = 0;
    let totalRevenue = 0;
    let awaitingPayment = 0;
    let automationSuccess = 0;
    let automationFailed = 0;
    let processing = 0;
    const revenueByInvoice = {};

    data.forEach((customer) => {
      const paidIds = new Set(
        (customer.paidInvoices || []).map((p) => p.invoiceId),
      );

      // Count paid invoices and revenue
      (customer.paidInvoices || []).forEach((p) => {
        totalPaid++;
        totalRevenue += p.productPrice || 0;
        const key = `#${p.invoiceId}`;
        revenueByInvoice[key] =
          (revenueByInvoice[key] || 0) + (p.productPrice || 0);
      });

      // Count attempts by status
      (customer.attemptHistory || []).forEach((attempt) => {
        totalAttempts++;
        if (attempt.status === "success" && !paidIds.has(attempt.invoiceId)) {
          awaitingPayment++;
        } else if (attempt.status === "success") {
          automationSuccess++;
        } else if (attempt.status === "failed") {
          automationFailed++;
        } else {
          processing++;
        }
      });
    });

    setStats({
      customers: data.length,
      totalAttempts,
      totalPaid,
      totalRevenue,
      awaitingPayment,
      automationSuccess,
      automationFailed,
      processing,
      revenueByInvoice,
    });
  };

  const toggleRow = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedRows(newExpanded);
  };

  // Mark a specific attempt as paid by its index in attemptHistory
  const handleMarkAttemptAsPaid = async (invoice, attemptIndex) => {
    const attempt = invoice.attemptHistory?.[attemptIndex];
    if (!attempt) return alert("Attempt not found");
    // Check paidInvoices (not attempt.status, since 'success' means automation done, not paid)
    const alreadyPaid = invoice.paidInvoices?.some(
      (p) => p.invoiceId === attempt.invoiceId,
    );
    if (alreadyPaid) return alert("This invoice is already marked as paid");

    const confirmed = window.confirm(
      `Mark this attempt as paid?\n\n` +
        `Customer: ${invoice.fullName}\n` +
        `Email: ${invoice.originalEmail}\n` +
        `Invoice: #${attempt.invoiceId}\n` +
        `Attempt: #${attemptIndex + 1} of ${invoice.attemptHistory.length}\n\n` +
        `This will record the payment.`,
    );
    if (!confirmed) return;

    try {
      const response = await apiService.markCatalogInvoiceAsPaid(
        invoice._id,
        attemptIndex,
      );
      if (response.success) {
        alert(response.message || "Marked as paid");
        fetchInvoices();
      }
    } catch (error) {
      alert("Failed: " + error.message);
    }
  };

  // Convenience: mark the most recent attempt as paid
  const handleMarkLatestAsPaid = async (invoice) => {
    if (!invoice.attemptHistory?.length) return alert("No attempts to mark");
    const latestIdx = invoice.attemptHistory.length - 1;
    const latest = invoice.attemptHistory[latestIdx];
    const alreadyPaid = invoice.paidInvoices?.some(
      (p) => p.invoiceId === latest.invoiceId,
    );
    if (alreadyPaid) return alert("Latest invoice already paid");
    handleMarkAttemptAsPaid(invoice, latestIdx);
  };

  useEffect(() => {
    if (isAuthenticated) fetchInvoices();
  }, [filters]);

  // ── Settings functions ─────────────────────────────────────────────────

  const fetchSettings = async () => {
    setSettingsLoading(true);
    try {
      const response = await apiService.getSettings();
      if (response.success) setSettings(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
      setSettingsMessage({
        type: "error",
        text: "Failed to load settings: " + error.message,
      });
    } finally {
      setSettingsLoading(false);
    }
  };

  const saveSettings = async (update) => {
    setSettingsSaving(true);
    setSettingsMessage(null);
    try {
      const response = await apiService.updateSettings(update);
      if (response.success) {
        setSettings((prev) => ({ ...prev, ...response.data }));
        setSettingsMessage({ type: "success", text: response.message });
        setTimeout(() => setSettingsMessage(null), 3000);
      }
    } catch (error) {
      setSettingsMessage({ type: "error", text: error.message });
    } finally {
      setSettingsSaving(false);
    }
  };

  useEffect(() => {
    if (activeTab === "settings" && !settings) fetchSettings();
  }, [activeTab]);

  // ── Login screen ───────────────────────────────────────────────────────

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-acblue rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Catalog Admin</h2>
            <p className="text-gray-600 mt-2">
              Enter password to access management
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acblue focus:border-transparent mb-4"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-acblue hover:bg-blue-900 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header + tabs */}
        <div className="mb-6">
          <div className="flex items-center justify-between border-b border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("invoices")}
                className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === "invoices"
                    ? "border-acblue text-acblue"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Package className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                Invoices
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === "settings"
                    ? "border-acblue text-acblue"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Settings className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                Settings
              </button>
            </div>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setPassword("");
              }}
              className="px-3 py-1.5 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* ── INVOICES TAB ────────────────────────────────────────────── */}
        {activeTab === "invoices" && (
          <>
            {/* Analytics: 4-column layout, status breakdown stacked in the 4th column */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Revenue card */}
              <div className="bg-acblue rounded-xl p-5 text-white">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-white/70 font-medium">
                    Total Revenue
                  </p>
                  <DollarSign className="w-6 h-6 text-acGold" />
                </div>
                <p className="text-3xl font-bold">
                  $
                  {stats.totalRevenue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-white/50 mt-2">
                  {stats.totalPaid} invoice{stats.totalPaid !== 1 ? "s" : ""}{" "}
                  paid
                </p>
                {Object.keys(stats.revenueByInvoice).length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                    {Object.entries(stats.revenueByInvoice).map(
                      ([inv, rev]) => (
                        <span
                          key={inv}
                          className="text-xs bg-white/10 rounded px-2 py-0.5"
                        >
                          {inv}: ${rev.toLocaleString()}
                        </span>
                      ),
                    )}
                  </div>
                )}
              </div>

              {/* Awaiting payment */}
              <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-gray-500 font-medium">
                    Awaiting Payment
                  </p>
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.awaitingPayment}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Checkout ready, not yet paid
                </p>
              </div>

              {/* Customers */}
              <div className="bg-white rounded-xl shadow p-5 border-l-4 border-gray-300">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-gray-500 font-medium">Customers</p>
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.customers}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {stats.totalAttempts} total attempt
                  {stats.totalAttempts !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Status breakdown: 4 mini cards stacked in a single column */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                {[
                  {
                    label: "Paid",
                    value: stats.totalPaid,
                    icon: CheckCircle,
                    accent: "border-green-500",
                    valueColor: "text-green-600",
                  },
                  {
                    label: "Checkout Ready",
                    value: stats.awaitingPayment,
                    icon: TrendingUp,
                    accent: "border-blue-500",
                    valueColor: "text-blue-600",
                  },
                  {
                    label: "Processing",
                    value: stats.processing,
                    icon: RefreshCw,
                    accent: "border-yellow-500",
                    valueColor: "text-yellow-600",
                  },
                  {
                    label: "Failed",
                    value: stats.automationFailed,
                    icon: XCircle,
                    accent: "border-red-500",
                    valueColor: "text-red-600",
                  },
                ].map(({ label, value, icon: Icon, accent, valueColor }) => (
                  <div
                    key={label}
                    className={`bg-white rounded-lg shadow-sm px-3 py-2 border-l-4 ${accent} flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${valueColor} opacity-60`} />
                      <p className="text-xs text-gray-500 font-medium">
                        {label}
                      </p>
                    </div>
                    <p className={`text-sm font-bold ${valueColor}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acblue focus:border-transparent"
                  />
                </div>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acblue"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
                <select
                  value={filters.invoiceId}
                  onChange={(e) =>
                    setFilters({ ...filters, invoiceId: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acblue"
                >
                  <option value="all">All Invoices</option>
                  {settings?.products?.map((p) => (
                    <option key={p.invoiceId} value={p.invoiceId}>
                      Invoice #{p.invoiceId}
                    </option>
                  )) ||
                    [1, 2, 3, 4].map((i) => (
                      <option key={i} value={String(i)}>
                        Invoice #{i}
                      </option>
                    ))}
                </select>
                <button
                  onClick={fetchInvoices}
                  disabled={loading}
                  className="flex items-center justify-center px-4 py-2 bg-acblue hover:bg-blue-900 text-white rounded-lg transition-colors disabled:bg-gray-400"
                >
                  <RefreshCw
                    className={`w-5 h-5 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </button>
              </div>
            </div>

            {/* Customer cards */}
            <div className="space-y-4">
              {invoices.map((invoice) => {
                // Group attempts by invoiceId
                const attemptsByInvoice = {};
                (invoice.attemptHistory || []).forEach((attempt, idx) => {
                  if (!attemptsByInvoice[attempt.invoiceId]) {
                    attemptsByInvoice[attempt.invoiceId] = [];
                  }
                  attemptsByInvoice[attempt.invoiceId].push({
                    ...attempt,
                    _realIdx: idx,
                  });
                });

                // Get all unique invoice IDs this customer has attempted
                const invoiceIds = Object.keys(attemptsByInvoice);

                // Check which invoices are paid
                const paidInvoiceIds = new Set(
                  (invoice.paidInvoices || []).map((p) => p.invoiceId),
                );

                const isExpanded = expandedRows.has(invoice._id);

                return (
                  <div
                    key={invoice._id}
                    className="bg-white rounded-lg shadow overflow-hidden"
                  >
                    {/* Customer header */}
                    <div
                      className="p-4 md:p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleRow(invoice._id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-acblue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <User className="w-5 h-5 text-acblue" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {invoice.fullName}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5" />
                              {invoice.originalEmail || invoice.email}
                            </p>
                            {invoice.originalEmail &&
                              invoice.email &&
                              invoice.email !== invoice.originalEmail && (
                                <p className="text-xs text-gray-400 flex items-center gap-1 ml-0.5">
                                  <span className="text-gray-300">used:</span>{" "}
                                  {invoice.email}
                                </p>
                              )}
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {invoice.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Invoice tiles with timestamp as subtext */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {invoiceIds.map((invId) => {
                              const isPaid = paidInvoiceIds.has(invId);
                              const paidInfo = (
                                invoice.paidInvoices || []
                              ).find((p) => p.invoiceId === invId);
                              const latestAttempt =
                                attemptsByInvoice[invId][
                                  attemptsByInvoice[invId].length - 1
                                ];
                              const timestamp =
                                isPaid && paidInfo
                                  ? new Date(paidInfo.paidAt).toLocaleString(
                                      [],
                                      {
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      },
                                    )
                                  : new Date(
                                      latestAttempt.attemptedAt,
                                    ).toLocaleString([], {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    });
                              return (
                                <div
                                  key={invId}
                                  className={`flex items-start gap-2 px-2.5 py-1.5 rounded-lg text-xs ${
                                    isPaid
                                      ? "bg-green-50 text-green-700"
                                      : latestAttempt.status === "success"
                                        ? "bg-blue-50 text-blue-700"
                                        : latestAttempt.status === "failed"
                                          ? "bg-red-50 text-red-700"
                                          : "bg-yellow-50 text-yellow-700"
                                  }`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 ${
                                      isPaid
                                        ? "bg-green-500"
                                        : latestAttempt.status === "success"
                                          ? "bg-blue-500"
                                          : latestAttempt.status === "failed"
                                            ? "bg-red-500"
                                            : "bg-yellow-500"
                                    }`}
                                  />
                                  <div className="leading-tight">
                                    <p className="font-semibold">
                                      Invoice {invId}
                                    </p>
                                    <p className="font-normal opacity-60">
                                      {timestamp}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {/* Stats */}
                          <div className="text-right text-xs text-gray-500 hidden md:block">
                            <p>{invoice.totalAttempts || 0} attempts</p>
                            <p className="text-green-600 font-medium">
                              {invoice.totalPaidInvoices || 0} paid
                            </p>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded: invoices grouped by ID */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-gray-100 px-4 md:px-5 py-4 bg-gray-50 space-y-4">
                            {invoiceIds.map((invId) => {
                              const attempts = attemptsByInvoice[invId];
                              const isPaid = paidInvoiceIds.has(invId);
                              const paidInfo = (
                                invoice.paidInvoices || []
                              ).find((p) => p.invoiceId === invId);
                              const latestAttempt =
                                attempts[attempts.length - 1];

                              return (
                                <div
                                  key={invId}
                                  className={`rounded-lg border ${
                                    isPaid
                                      ? "border-green-200 bg-green-50/50"
                                      : "border-gray-200 bg-white"
                                  }`}
                                >
                                  {/* Invoice tile header */}
                                  <div className="p-3 md:p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                                          isPaid
                                            ? "bg-green-500 text-white"
                                            : latestAttempt.status === "success"
                                              ? "bg-blue-500 text-white"
                                              : latestAttempt.status ===
                                                  "failed"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                      >
                                        #{invId}
                                      </div>
                                      <div>
                                        <p className="font-medium text-gray-900 text-sm">
                                          Invoice #{invId}
                                          {isPaid && (
                                            <span className="ml-2 text-green-600 text-xs font-semibold">
                                              PAID
                                            </span>
                                          )}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {attempts.length} attempt
                                          {attempts.length !== 1 ? "s" : ""}
                                          {paidInfo &&
                                            ` · Paid ${new Date(paidInfo.paidAt).toLocaleDateString()}`}
                                          {paidInfo &&
                                            ` · $${paidInfo.productPrice}`}
                                        </p>
                                      </div>
                                    </div>
                                    {isPaid ? (
                                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                                        Paid ✓
                                      </span>
                                    ) : latestAttempt.status === "success" ? (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleMarkAttemptAsPaid(
                                            invoice,
                                            latestAttempt._realIdx,
                                          );
                                        }}
                                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors"
                                      >
                                        Mark Paid
                                      </button>
                                    ) : latestAttempt.status === "failed" ? (
                                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">
                                        Failed
                                      </span>
                                    ) : (
                                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">
                                        Processing
                                      </span>
                                    )}
                                  </div>

                                  {/* Individual attempts for this invoice */}
                                  {attempts.length > 1 && (
                                    <div className="border-t border-gray-100 px-3 md:px-4 py-2 space-y-1">
                                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                                        Attempts
                                      </p>
                                      {attempts.map((attempt, i) => {
                                        const attemptPaid =
                                          isPaid && i === attempts.length - 1;
                                        return (
                                          <div
                                            key={i}
                                            className="flex items-center justify-between py-1 text-xs"
                                          >
                                            <div className="flex items-center gap-2 text-gray-500">
                                              <span
                                                className={`w-1.5 h-1.5 rounded-full ${
                                                  attemptPaid
                                                    ? "bg-green-500"
                                                    : attempt.status ===
                                                        "success"
                                                      ? "bg-blue-500"
                                                      : attempt.status ===
                                                          "failed"
                                                        ? "bg-red-500"
                                                        : "bg-yellow-500"
                                                }`}
                                              />
                                              <span>
                                                {new Date(
                                                  attempt.attemptedAt,
                                                ).toLocaleString()}
                                              </span>
                                              {attempt.automationType && (
                                                <span className="text-gray-400 bg-gray-100 px-1 py-0.5 rounded">
                                                  {attempt.automationType}
                                                </span>
                                              )}
                                            </div>
                                            <span
                                              className={`font-medium ${
                                                attemptPaid
                                                  ? "text-green-600"
                                                  : attempt.status === "success"
                                                    ? "text-blue-600"
                                                    : attempt.status ===
                                                        "failed"
                                                      ? "text-red-500"
                                                      : "text-yellow-600"
                                              }`}
                                            >
                                              {attemptPaid
                                                ? "paid"
                                                : attempt.status === "success"
                                                  ? "checkout ready"
                                                  : attempt.status}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {invoices.length === 0 && !loading && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No invoices found</p>
                </div>
              )}
              {loading && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-acblue mx-auto" />
                  <p className="mt-4 text-gray-600">Loading invoices...</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── SETTINGS TAB ────────────────────────────────────────────── */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            {settingsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-acblue mx-auto" />
                <p className="mt-4 text-gray-600">Loading settings...</p>
              </div>
            ) : settings ? (
              <>
                {/* Status message */}
                {settingsMessage && (
                  <div
                    className={`p-4 rounded-lg text-sm font-medium ${
                      settingsMessage.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {settingsMessage.text}
                  </div>
                )}

                {/* Automation switch */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-acblue" />
                    Active Automation
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Choose which payment automation runs when a client checks
                    out. Changing this affects all new checkout attempts
                    immediately.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {(
                      settings.availableAutomations || [
                        "catlog",
                        "bumpa",
                        "manual",
                      ]
                    ).map((type) => (
                      <button
                        key={type}
                        onClick={() => saveSettings({ activeAutomation: type })}
                        disabled={settingsSaving}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                          settings.activeAutomation === type
                            ? "bg-acblue text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } ${settingsSaving ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                        {settings.activeAutomation === type && " (active)"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Products editor */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-acblue" />
                        Products
                      </h3>
                      <p className="text-sm text-gray-500">
                        Edit product names, prices, and descriptions. Product
                        names are shown to the payment gateway (intentionally
                        different from descriptions).
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newId = String(
                          (settings.products?.length || 0) + 1,
                        );
                        const updated = [
                          ...(settings.products || []),
                          {
                            invoiceId: newId,
                            productName: "New Product",
                            price: 0,
                            currency: "USD",
                            description: "New service description",
                            enabled: true,
                          },
                        ];
                        setSettings((prev) => ({ ...prev, products: updated }));
                      }}
                      className="flex items-center gap-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(settings.products || []).map((product, idx) => (
                      <div
                        key={idx}
                        className={`border rounded-lg p-4 ${product.enabled ? "border-gray-200" : "border-gray-100 bg-gray-50 opacity-60"}`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Invoice ID
                            </label>
                            <input
                              type="text"
                              value={product.invoiceId}
                              onChange={(e) => {
                                const updated = [...settings.products];
                                updated[idx] = {
                                  ...updated[idx],
                                  invoiceId: e.target.value,
                                };
                                setSettings((prev) => ({
                                  ...prev,
                                  products: updated,
                                }));
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Product Name (gateway)
                            </label>
                            <input
                              type="text"
                              value={product.productName}
                              onChange={(e) => {
                                const updated = [...settings.products];
                                updated[idx] = {
                                  ...updated[idx],
                                  productName: e.target.value,
                                };
                                setSettings((prev) => ({
                                  ...prev,
                                  products: updated,
                                }));
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Description
                            </label>
                            <input
                              type="text"
                              value={product.description}
                              onChange={(e) => {
                                const updated = [...settings.products];
                                updated[idx] = {
                                  ...updated[idx],
                                  description: e.target.value,
                                };
                                setSettings((prev) => ({
                                  ...prev,
                                  products: updated,
                                }));
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Price (USD)
                            </label>
                            <input
                              type="number"
                              value={product.price}
                              onChange={(e) => {
                                const updated = [...settings.products];
                                updated[idx] = {
                                  ...updated[idx],
                                  price: parseFloat(e.target.value) || 0,
                                };
                                setSettings((prev) => ({
                                  ...prev,
                                  products: updated,
                                }));
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div className="flex items-end gap-2">
                            <button
                              onClick={() => {
                                const updated = [...settings.products];
                                updated[idx] = {
                                  ...updated[idx],
                                  enabled: !updated[idx].enabled,
                                };
                                setSettings((prev) => ({
                                  ...prev,
                                  products: updated,
                                }));
                              }}
                              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                              title={product.enabled ? "Disable" : "Enable"}
                            >
                              {product.enabled ? (
                                <ToggleRight className="w-5 h-5 text-green-600" />
                              ) : (
                                <ToggleLeft className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Delete product "${product.productName}"?`,
                                  )
                                ) {
                                  const updated = settings.products.filter(
                                    (_, i) => i !== idx,
                                  );
                                  setSettings((prev) => ({
                                    ...prev,
                                    products: updated,
                                  }));
                                }
                              }}
                              className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      saveSettings({ products: settings.products })
                    }
                    disabled={settingsSaving}
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-acblue hover:bg-blue-900 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {settingsSaving ? "Saving..." : "Save Products"}
                  </button>
                </div>

                {/* Company info editor */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-acblue" />
                    Company Info
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Displayed on invoice pages. Changes take effect on the next
                    invoice load.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["name", "address", "phone", "email"].map((field) => (
                      <div key={field}>
                        <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">
                          {field}
                        </label>
                        <input
                          type="text"
                          value={settings.companyInfo?.[field] || ""}
                          onChange={(e) => {
                            setSettings((prev) => ({
                              ...prev,
                              companyInfo: {
                                ...prev.companyInfo,
                                [field]: e.target.value,
                              },
                            }));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      saveSettings({ companyInfo: settings.companyInfo })
                    }
                    disabled={settingsSaving}
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-acblue hover:bg-blue-900 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {settingsSaving ? "Saving..." : "Save Company Info"}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Could not load settings</p>
                <button
                  onClick={fetchSettings}
                  className="mt-2 text-acblue underline text-sm"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCatlogInvoices;
