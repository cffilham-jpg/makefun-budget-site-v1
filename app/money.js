export const rupiah = (value, compact = false) => {
  const number = Math.round(Number(value) || 0);
  if (compact && Math.abs(number) >= 1000000) return `Rp ${(number / 1000000).toFixed(1).replace('.', ',')} jt`;
  if (compact && Math.abs(number) >= 1000) return `Rp ${(number / 1000).toFixed(0)} rb`;
  return `Rp ${number.toLocaleString('id-ID')}`;
};

export const signedRupiah = (value, type) => `${type === 'income' ? '+' : '−'}${rupiah(value)}`;

export const sum = (items, selector = (item) => item) => items.reduce((total, item) => total + Number(selector(item) || 0), 0);

export const totals = (transactions) => {
  const income = sum(transactions.filter((item) => item.type === 'income'), (item) => item.amount);
  const expenses = sum(transactions.filter((item) => item.type === 'expense' && item.category !== 'Tabungan'), (item) => item.amount);
  const saved = sum(transactions.filter((item) => item.type === 'expense' && item.category === 'Tabungan'), (item) => item.amount);
  return { income, expenses, saved, available: income - expenses - saved, savingsRate: income ? Math.round((saved / income) * 100) : 0 };
};

export const byCategory = (transactions) => {
  const map = new Map();
  transactions.filter((item) => item.type === 'expense' && item.category !== 'Tabungan').forEach((item) => map.set(item.category, (map.get(item.category) || 0) + item.amount));
  return [...map.entries()].map(([name, amount]) => ({ name, amount })).sort((a, b) => b.amount - a.amount);
};

export const monthsToGoal = (goal) => goal.monthly > 0 ? Math.max(0, Math.ceil((goal.target - goal.saved) / goal.monthly)) : null;

export const finishDate = (goal) => {
  const months = monthsToGoal(goal);
  if (months === null) return 'Atur kontribusi';
  const date = new Date(2026, 10, 1);
  date.setMonth(date.getMonth() + months);
  return date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
};

const simulate = (debts, extra, strategy) => {
  const items = debts.map((debt) => ({ ...debt, current: debt.balance }));
  let months = 0;
  let interest = 0;
  while (items.some((item) => item.current > 0.5) && months < 240) {
    months += 1;
    items.forEach((item) => {
      if (item.current <= 0.5) return;
      const charge = item.current * (item.apr / 100 / 12);
      item.current += charge;
      interest += charge;
    });
    let freedMinimums = 0;
    items.forEach((item) => {
      if (item.current <= 0.5) return;
      const payment = Math.min(item.minimum, item.current);
      item.current -= payment;
      freedMinimums += item.minimum - payment;
    });
    let extraAvailable = extra + freedMinimums;
    const priorityOrder = items.filter((item) => item.current > 0.5).sort((a, b) => strategy === 'avalanche' ? b.apr - a.apr : a.current - b.current);
    priorityOrder.forEach((item) => {
      const payment = Math.min(extraAvailable, item.current);
      item.current -= payment;
      extraAvailable -= payment;
    });
  }
  return { months, interest: Math.round(interest) };
};

export const payoffPlan = (debts, extra = 500000) => ({ avalanche: simulate(debts, Number(extra) || 0, 'avalanche'), snowball: simulate(debts, Number(extra) || 0, 'snowball') });

export const categoryActuals = (transactions) => byCategory(transactions).reduce((acc, item) => ({ ...acc, [item.name]: item.amount }), {});

export const formatDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
