import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart, Plus, Upload, CreditCard, Settings } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const mockTransactions = [
  { id: 1, date: '2023-10-01', amount: 50000, type: 'income', category: 'Salary', account: 'Bank', note: 'Monthly salary' },
  { id: 2, date: '2023-10-02', amount: 25000, type: 'expense', category: 'Food', account: 'Cash', note: 'Lunch' },
  { id: 3, date: '2023-10-03', amount: 15000, type: 'expense', category: 'Transport', account: 'E-Wallet', note: 'Gojek' },
  { id: 4, date: '2023-10-04', amount: 80000, type: 'income', category: 'Freelance', account: 'Bank', note: 'Project payment' },
  { id: 5, date: '2023-10-05', amount: 45000, type: 'expense', category: 'Shopping', account: 'Credit Card', note: 'Monthly groceries' },
  { id: 6, date: '2023-10-06', amount: 30000, type: 'expense', category: 'Entertainment', account: 'E-Wallet', note: 'Movie tickets' },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function App() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    type: 'expense',
    category: 'Food',
    account: 'Cash',
    note: ''
  });

  const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Utilities', 'Health', 'Education', 'Salary', 'Freelance'];
  const accounts = ['Cash', 'Bank', 'E-Wallet', 'Credit Card'];

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const existing = acc.find(item => item.name === transaction.category);
      if (existing) {
        existing.value += transaction.amount;
      } else {
        acc.push({ name: transaction.category, value: transaction.amount });
      }
      return acc;
    }, []);

  const dailyData = Array.from({ length: 31 }, (_, i) => {
    const date = `2023-10-${i + 1 < 10 ? '0' : ''}${i + 1}`;
    const dailyIncome = transactions
      .filter(t => t.date === date && t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const dailyExpense = transactions
      .filter(t => t.date === date && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { date: `Oct ${i + 1}`, income: dailyIncome, expense: dailyExpense };
  }).filter(data => data.income > 0 || data.expense > 0);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTransaction.amount || isNaN(newTransaction.amount)) return;
    
    const transaction = {
      ...newTransaction,
      id: Date.now(),
      amount: Number(newTransaction.amount)
    };
    
    setTransactions([transaction, ...transactions]);
    setNewTransaction({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      type: 'expense',
      category: 'Food',
      account: 'Cash',
      note: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm"
      >
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">MoneyTrack</h1>
          </div>
          <div className="flex space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">U</span>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-600 text-sm font-medium">Total Income</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">Rp {totalIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-600 text-sm font-medium">Total Expense</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">Rp {totalExpense.toLocaleString()}</p>
              </div>
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-600 text-sm font-medium">Current Balance</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">Rp {balance.toLocaleString()}</p>
              </div>
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <PieChart className="w-5 h-5 text-blue-600 mr-2" />
                Monthly Overview
              </h2>
            </div>
            <div className="p-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="#10b981" name="Income" strokeWidth={2} />
                  <Line type="monotone" dataKey="expense" stroke="#ef4444" name="Expense" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Expense Distribution</h2>
            </div>
            <div className="p-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={expenseByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Plus className="w-4 h-4 mr-2" />
                New Transaction
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Description</th>
                    <th className="py-3 px-6">Category</th>
                    <th className="py-3 px-6">Account</th>
                    <th className="py-3 px-6 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6 text-gray-500">{transaction.date}</td>
                      <td className="py-4 px-6 font-medium text-gray-800">{transaction.note}</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">{transaction.account}</span>
                        </div>
                      </td>
                      <td className={`py-4 px-6 text-right font-medium ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'} Rp {transaction.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Add New Transaction</h2>
            </div>
            <form onSubmit={handleAddTransaction} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (Rp)</label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newTransaction.type}
                    onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
                <select
                  value={newTransaction.account}
                  onChange={(e) => setNewTransaction({ ...newTransaction, account: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {accounts.map((account) => (
                    <option key={account} value={account}>{account}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <input
                  type="text"
                  value={newTransaction.note}
                  onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                  placeholder="What was this for?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  <Upload className="w-4 h-4 mx-auto" />
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          © 2023 MoneyTrack. All rights reserved. Your financial data is encrypted and secure.
        </div>
      </footer>
    </div>
  );
}
