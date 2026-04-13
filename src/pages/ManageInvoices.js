import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
 Search,
 Filter,
 Eye,
 Download,
 Calendar,
 DollarSign,
 Users,
 CheckCircle,
 Clock,
 XCircle,
 RefreshCw,
 FileText,
 Mail,
 Phone,
 LogOut,
 Copy,
 ExternalLink
} from 'lucide-react';
import { apiService } from '../config/api';


const ManageInvoices = () => {
 const [invoices, setInvoices] = useState([]);
 const [loading, setLoading] = useState(true);
 const [searchTerm, setSearchTerm] = useState('');
 const [statusFilter, setStatusFilter] = useState('all');
 const [dateFilter, setDateFilter] = useState('all');
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
 const [stats, setStats] = useState({
   total: 0,
   pending: 0,
   processing: 0,
   completed: 0,
   failed: 0
 });


 // Authentication state
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [password, setPassword] = useState('');
 const [authError, setAuthError] = useState('');


 // Access password - you can change this to whatever you want
 const ACCESS_PASSWORD = 'Somygo123$';


 const itemsPerPage = 10;


 // Handle authentication
 const handleAuth = (e) => {
   e.preventDefault();
   if (password === ACCESS_PASSWORD) {
     setIsAuthenticated(true);
     setAuthError('');
     // Store auth state in sessionStorage so it persists during the session
     sessionStorage.setItem('somygo_invoice_auth', 'true');
   } else {
     setAuthError('Invalid password. Please try again.');
     setPassword('');
   }
 };


 // Check if already authenticated on component mount
 useEffect(() => {
   const isAuth = sessionStorage.getItem('somygo_invoice_auth');
   if (isAuth === 'true') {
     setIsAuthenticated(true);
   }
 }, []);


 // Logout function
 const handleLogout = () => {
   setIsAuthenticated(false);
   sessionStorage.removeItem('somygo_invoice_auth');
   setPassword('');
 };


 useEffect(() => {
   if (isAuthenticated) {
     fetchInvoices();
   }
 }, [currentPage, statusFilter, dateFilter, searchTerm, isAuthenticated]);


 const fetchInvoices = async () => {
   setLoading(true);
   try {
     // This would call your backend API
     const response = await apiService.getPaymentRequests({
       page: currentPage,
       limit: itemsPerPage,
       status: statusFilter !== 'all' ? statusFilter : undefined,
       search: searchTerm || undefined,
       dateRange: dateFilter !== 'all' ? dateFilter : undefined
     });
    
     setInvoices(response.data.requests || []);
     setTotalPages(Math.ceil((response.data.total || 0) / itemsPerPage));
    
     // Calculate stats
     const allRequests = response.data.requests || [];
     setStats({
       total: allRequests.length,
       pending: allRequests.filter(inv => inv.status === 'pending').length,
       processing: allRequests.filter(inv => inv.status === 'processing').length,
       completed: allRequests.filter(inv => inv.status === 'completed').length,
       failed: allRequests.filter(inv => inv.status === 'failed').length
     });
   } catch (error) {
     console.error('Error fetching invoices:', error);
     setInvoices([]);
   } finally {
     setLoading(false);
   }
 };


 const getStatusIcon = (status) => {
   switch (status) {
     case 'completed':
       return <CheckCircle className="w-4 h-4 text-green-600" />;
     case 'processing':
       return <Clock className="w-4 h-4 text-blue-600" />;
     case 'failed':
       return <XCircle className="w-4 h-4 text-red-600" />;
     default:
       return <Clock className="w-4 h-4 text-blue-600" />;
   }
 };


 // Copy to clipboard function
 const copyToClipboard = (text, label) => {
   navigator.clipboard.writeText(text).then(() => {
     alert(`${label} copied to clipboard!`);
   }).catch(err => {
     console.error('Failed to copy:', err);
   });
 };

 const getStatusBadge = (status) => {
   const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
   switch (status) {
     case 'completed':
       return `${baseClasses} bg-green-100 text-green-800`;
     case 'processing':
       return `${baseClasses} bg-blue-100 text-blue-800`;
     case 'failed':
       return `${baseClasses} bg-red-100 text-red-800`;
     default:
       return `${baseClasses} bg-blue-100 text-blue-800`;
   }
 };


 const formatDate = (dateString) => {
   return new Date(dateString).toLocaleDateString('en-US', {
     year: 'numeric',
     month: 'short',
     day: 'numeric',
     hour: '2-digit',
     minute: '2-digit'
   });
 };


 const handleViewInvoice = (invoice) => {
   // Navigate to individual invoice view or open modal
   window.open(`/invoice/payments?email=${encodeURIComponent(invoice.originalEmail || invoice.email)}&name=${encodeURIComponent(invoice.fullName)}`, '_blank');
 };


 const handleRefresh = () => {
   fetchInvoices();
 };


 const filteredInvoices = invoices.filter(invoice => {
   const matchesSearch = !searchTerm ||
     invoice.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     invoice.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     invoice.originalEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     invoice._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     invoice.tx_ref?.toLowerCase().includes(searchTerm.toLowerCase());
  
   return matchesSearch;
 });


 // If not authenticated, show login form
 if (!isAuthenticated) {
   return (
     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
       <motion.div
         className="max-w-md w-full bg-white rounded-lg shadow-lg p-8"
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
       >
         <div className="text-center mb-8">
           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <FileText className="w-8 h-8 text-blue-600" />
           </div>
           <h2 className="text-2xl font-bold text-gray-900 mb-2">
             Invoice Management Access
           </h2>
           <p className="text-gray-600">
             Please enter the access password to view and manage Somygo invoices.
           </p>
         </div>


         <form onSubmit={handleAuth}>
           <div className="mb-6">
             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
               Access Password
             </label>
             <input
               type="password"
               id="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
               placeholder="Enter access password"
               required
             />
           </div>


           {authError && (
             <motion.div
               className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.3 }}
             >
               {authError}
             </motion.div>
           )}


           <button
             type="submit"
             className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
           >
             Access Invoice Management
           </button>
         </form>


         <div className="mt-6 text-center">
           <p className="text-xs text-gray-500">
             Authorized personnel only. All access is logged and monitored.
           </p>
         </div>
       </motion.div>
     </div>
   );
 }


 return (
   <div className="min-h-screen bg-gray-50">
     {/* Header */}
     <div className="bg-white border-b border-gray-200">
       <div className="max-w-7xl mx-auto px-6 py-8">
         <div className="flex justify-between items-center">
           <div>
             <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
             <p className="text-gray-600 mt-2">Manage and track all Somygo invoices</p>
           </div>
           <div className="flex space-x-3">
             <button
               onClick={handleRefresh}
               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
             >
               <RefreshCw className="w-4 h-4" />
               <span>Refresh</span>
             </button>
             <button
               onClick={handleLogout}
               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
             >
               <LogOut className="w-4 h-4" />
               <span>Logout</span>
             </button>
           </div>
         </div>
       </div>
     </div>


     <div className="max-w-7xl mx-auto px-6 py-8">
       {/* Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
           <div className="flex items-center">
             <FileText className="w-8 h-8 text-gray-600" />
             <div className="ml-4">
               <p className="text-sm font-medium text-gray-600">Total</p>
               <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
             </div>
           </div>
         </div>
        
         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
           <div className="flex items-center">
             <Clock className="w-8 h-8 text-blue-600" />
             <div className="ml-4">
               <p className="text-sm font-medium text-gray-600">Pending</p>
               <p className="text-2xl font-bold text-blue-600">{stats.pending}</p>
             </div>
           </div>
         </div>


         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
           <div className="flex items-center">
             <RefreshCw className="w-8 h-8 text-blue-600" />
             <div className="ml-4">
               <p className="text-sm font-medium text-gray-600">Processing</p>
               <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
             </div>
           </div>
         </div>


         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
           <div className="flex items-center">
             <CheckCircle className="w-8 h-8 text-green-600" />
             <div className="ml-4">
               <p className="text-sm font-medium text-gray-600">Completed</p>
               <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
             </div>
           </div>
         </div>


         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
           <div className="flex items-center">
             <XCircle className="w-8 h-8 text-red-600" />
             <div className="ml-4">
               <p className="text-sm font-medium text-gray-600">Failed</p>
               <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
             </div>
           </div>
         </div>
       </div>


       {/* Filters */}
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           {/* Search */}
           <div className="relative">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
             <input
               type="text"
               placeholder="Search invoices..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
             />
           </div>


           {/* Status Filter */}
           <select
             value={statusFilter}
             onChange={(e) => setStatusFilter(e.target.value)}
             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
           >
             <option value="all">All Statuses</option>
             <option value="pending">Pending</option>
             <option value="processing">Processing</option>
             <option value="completed">Completed</option>
             <option value="failed">Failed</option>
           </select>


           {/* Date Filter */}
           <select
             value={dateFilter}
             onChange={(e) => setDateFilter(e.target.value)}
             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
           >
             <option value="all">All Time</option>
             <option value="today">Today</option>
             <option value="week">This Week</option>
             <option value="month">This Month</option>
           </select>


           {/* Results Count */}
           <div className="flex items-center text-sm text-gray-600">
             <span>{filteredInvoices.length} of {stats.total} invoices</span>
           </div>
         </div>
       </div>


       {/* Invoice Table */}
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
         {loading ? (
           <div className="flex items-center justify-center py-12">
             <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
             <span className="ml-3 text-gray-600">Loading invoices...</span>
           </div>
         ) : filteredInvoices.length === 0 ? (
           <div className="text-center py-12">
             <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
             <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
             <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
           </div>
         ) : (
           <div className="overflow-x-auto">
             <table className="w-full">
               <thead className="bg-gray-50">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Invoice
                   </th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Customer
                   </th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Amount
                   </th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Status
                   </th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Date
                   </th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Actions
                   </th>
                 </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                 {filteredInvoices.map((invoice) => (
                   <tr key={invoice._id} className="hover:bg-gray-50">
                     <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {invoice._id?.slice(-8) || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">Travel Package</div>
                          {invoice.tx_ref && (
                            <div className="text-xs text-blue-600 mt-1 font-mono flex items-center gap-1">
                              <span>Ref: {invoice.tx_ref.slice(0, 20)}...</span>
                              <button
                                onClick={() => copyToClipboard(invoice.tx_ref, 'Transaction reference')}
                                className="hover:bg-blue-100 p-1 rounded"
                                title="Copy transaction reference"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                          {invoice.flutterwaveData?.transaction_id && (
                            <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                              <span>FLW ID: {invoice.flutterwaveData.transaction_id}</span>
                              <a
                                href={`https://dashboard.flutterwave.com/transactions/${invoice.flutterwaveData.transaction_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:bg-green-100 p-1 rounded"
                                title="View in Flutterwave Dashboard"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    
                     <td className="px-6 py-4 whitespace-nowrap">
                       <div>
                         <div className="text-sm font-medium text-gray-900">{invoice.fullName}</div>
                         <div className="text-sm text-gray-500 flex items-center mb-1">
                           <Mail className="w-3 h-3 mr-1" />
                           <span className="font-medium text-gray-600">Original:</span>
                           <span className="ml-1">{invoice.originalEmail || invoice.email}</span>
                         </div>
                         {invoice.transformedEmail && (
                           <div className="text-sm text-gray-500 flex items-center mb-1">
                             <Mail className="w-3 h-3 mr-1" />
                             <span className="font-medium text-blue-600">Transformed:</span>
                             <span className="ml-1 text-blue-600">{invoice.transformedEmail}</span>
                           </div>
                         )}
                         {invoice.phone && (
                           <div className="text-sm text-gray-500 flex items-center">
                             <Phone className="w-3 h-3 mr-1" />
                             {invoice.phone}
                           </div>
                         )}
                       </div>
                     </td>


                     <td className="px-6 py-4 whitespace-nowrap">
                       <div className="text-sm font-medium text-gray-900">$1,149.00</div>
                     </td>


                     <td className="px-6 py-4 whitespace-nowrap">
                       <span className={getStatusBadge(invoice.status)}>
                         {getStatusIcon(invoice.status)}
                         <span className="ml-1 capitalize">{invoice.status}</span>
                       </span>
                     </td>


                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                       {formatDate(invoice.createdAt)}
                     </td>


                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                       <div className="flex space-x-2">
                         <button
                           onClick={() => handleViewInvoice(invoice)}
                           className="text-blue-600 hover:text-blue-900 flex items-center"
                         >
                           <Eye className="w-4 h-4 mr-1" />
                           View
                         </button>
                         {invoice.checkoutUrl && (
                           <a
                             href={invoice.checkoutUrl}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="text-green-600 hover:text-green-900 flex items-center"
                           >
                             <DollarSign className="w-4 h-4 mr-1" />
                             Pay
                           </a>
                         )}
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         )}
       </div>


       {/* Pagination */}
       {totalPages > 1 && (
         <div className="flex items-center justify-between mt-6">
           <div className="text-sm text-gray-600">
             Page {currentPage} of {totalPages}
           </div>
           <div className="flex space-x-2">
             <button
               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
               disabled={currentPage === 1}
               className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               Previous
             </button>
             <button
               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
               disabled={currentPage === totalPages}
               className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               Next
             </button>
           </div>
         </div>
       )}
     </div>
   </div>
 );
};


export default ManageInvoices;





