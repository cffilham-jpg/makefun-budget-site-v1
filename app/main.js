import { bills as starterBills, debts as starterDebts, goals as starterGoals, transactions as starterTransactions } from './data.js';
import { finishDate, monthsToGoal, rupiah, sum } from './money.js';
import { renderPage } from './views.js';

const STORAGE_KEY = 'rupiah-rapi-household-v1';
const initialState = () => ({
  transactions: starterTransactions.map((item) => ({ ...item })),
  goals: starterGoals.map((item) => ({ ...item })),
  debts: starterDebts.map((item) => ({ ...item })),
  bills: starterBills.map((item) => ({ ...item })),
  filters: { search: '', category: '' },
  formOpen: '',
  budgetSplit: { needs: 50, wants: 30, savings: 20 },
  plannerIncome: 12500000,
  debtExtra: 500000,
});

const loadState = () => {
  const base = initialState();
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!saved) return base;
    return { ...base, ...saved, filters: { ...base.filters, ...saved.filters }, budgetSplit: { ...base.budgetSplit, ...saved.budgetSplit } };
  } catch {
    return base;
  }
};

const state = loadState();
const app = document.querySelector('#app');
const nav = document.querySelector('.main-nav');

const saveState = () => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Storage can be disabled by the browser. */ }
};

const currentRoute = () => {
  const route = window.location.hash.replace(/^#/, '') || '/';
  return route.split('?')[0];
};

const render = () => {
  const route = currentRoute();
  app.innerHTML = renderPage(route, state);
  document.querySelectorAll('[data-route]').forEach((link) => link.classList.toggle('active', link.dataset.route === route));
  nav.classList.remove('open');
  document.title = `${document.querySelector('[data-route="' + route + '"]')?.textContent || 'Ringkasan'} · Rupiah Rapi`;
};

const updateInput = (element) => {
  if (element.dataset.split) {
    state.budgetSplit[element.dataset.split] = Number(element.value);
    const splitTotal = state.budgetSplit.needs + state.budgetSplit.wants + state.budgetSplit.savings;
    if (splitTotal !== 100) {
      const others = Object.keys(state.budgetSplit).filter((key) => key !== element.dataset.split);
      const rest = 100 - state.budgetSplit[element.dataset.split];
      const oldRest = state.budgetSplit[others[0]] + state.budgetSplit[others[1]];
      state.budgetSplit[others[0]] = Math.round(rest * state.budgetSplit[others[0]] / oldRest);
      state.budgetSplit[others[1]] = rest - state.budgetSplit[others[0]];
    }
    saveState();
    return;
  }
  if (element.id === 'planner-income') state.plannerIncome = Number(element.value) || 0;
  if (element.classList.contains('goal-contribution')) {
    const goal = state.goals.find((item) => item.id === Number(element.dataset.goalId));
    if (goal) goal.monthly = Number(element.value) || 0;
  }
  if (element.id === 'debt-extra') state.debtExtra = Number(element.value) || 0;
  if (element.id === 'search-input') state.filters.search = element.value;
  if (element.id === 'category-filter') state.filters.category = element.value;
  saveState();
};

document.addEventListener('click', (event) => {
  const opener = event.target.closest('[data-open-form]');
  if (opener) { state.formOpen = opener.dataset.openForm; saveState(); render(); return; }
  if (event.target.closest('.close-form')) { state.formOpen = ''; saveState(); render(); return; }
  const deleteButton = event.target.closest('.delete-transaction');
  if (deleteButton) {
    state.transactions = state.transactions.filter((item) => item.id !== Number(deleteButton.dataset.id));
    saveState(); render(); return;
  }
  if (event.target.closest('.mobile-menu')) nav.classList.toggle('open');
});

document.addEventListener('input', (event) => {
  const element = event.target;
  if (element.id === 'search-input') {
    state.filters.search = element.value;
    const cursor = element.selectionStart;
    const route = currentRoute();
    app.innerHTML = renderPage(route, state);
    document.querySelector('#search-input')?.focus();
    document.querySelector('#search-input')?.setSelectionRange(cursor, cursor);
    document.querySelectorAll('[data-route]').forEach((link) => link.classList.toggle('active', link.dataset.route === route));
    saveState();
    return;
  }
  if (element.id === 'debt-extra') {
    updateInput(element);
    const value = element.value;
    const holder = element.closest('.card');
    const output = holder?.querySelector('#debt-extra-value');
    if (output) output.textContent = `Rp ${Number(value).toLocaleString('id-ID')}`;
    const badge = holder?.querySelector('.soft-pill');
    if (badge) badge.textContent = `Rp ${Number(value).toLocaleString('id-ID')} ekstra`;
    return;
  }
  if (element.classList.contains('goal-contribution')) {
    const goal = state.goals.find((item) => item.id === Number(element.dataset.goalId));
    if (!goal) return;
    goal.monthly = Number(element.value) || 0;
    saveState();
    const card = element.closest('.goal-card');
    const months = monthsToGoal(goal);
    const estimate = card?.querySelector('.goal-meta');
    if (estimate) estimate.innerHTML = `<span><b>${months ?? '—'}</b> bulan lagi</span><span>Target ${finishDate(goal)}</span>`;
    const monthlyTotal = sum(state.goals, (item) => item.monthly);
    const summary = document.querySelector('.goals-grid aside .card h2');
    if (summary) summary.innerHTML = `${rupiah(monthlyTotal)}<small>/ bulan</small>`;
  }
});

document.addEventListener('change', (event) => {
  const element = event.target;
  updateInput(element);
  if (element.id === 'category-filter') { render(); return; }
  if (element.dataset.split || element.id === 'planner-income' || element.classList.contains('goal-contribution') || element.id === 'debt-extra') { render(); return; }
  if (element.dataset.billId) {
    const bill = state.bills.find((item) => item.id === Number(element.dataset.billId));
    if (bill) bill.paid = element.checked;
    saveState(); render();
  }
});

document.addEventListener('submit', (event) => {
  const form = event.target;
  if (form.id === 'transaction-form') {
    event.preventDefault();
    const values = new FormData(form);
    const type = values.get('type');
    let category = values.get('category');
    if (type === 'income') category = 'Pendapatan';
    state.transactions.push({ id: Date.now(), date: values.get('date'), description: values.get('description').trim(), category, amount: Number(values.get('amount')), type });
    state.formOpen = '';
    saveState(); render();
  }
  if (form.id === 'goal-form') {
    event.preventDefault();
    const values = new FormData(form);
    state.goals.push({ id: Date.now(), name: values.get('name').trim(), target: Number(values.get('target')), saved: Number(values.get('saved')) || 0, monthly: Number(values.get('monthly')) || 0, emoji: '✦', tone: 'mint' });
    state.formOpen = '';
    saveState(); render();
  }
});

window.addEventListener('hashchange', () => { state.formOpen = ''; render(); });
window.addEventListener('storage', (event) => { if (event.key === STORAGE_KEY) Object.assign(state, loadState()); render(); });

render();
