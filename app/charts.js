const esc = (value) => String(value).replace(/[&<>\"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;' }[char]));

export const donutChart = (items, total) => {
  const cx = 104; const cy = 104; const radius = 72; const stroke = 24;
  const centerLabel = total >= 1000000 ? `Rp ${(total / 1000000).toFixed(1).replace('.', ',')} jt` : `Rp ${total.toLocaleString('id-ID')}`;
  let angle = -Math.PI / 2;
  const paths = items.map((item) => {
    const slice = total ? (item.amount / total) * Math.PI * 2 : 0;
    const end = angle + slice;
    const large = slice > Math.PI ? 1 : 0;
    const x1 = cx + radius * Math.cos(angle); const y1 = cy + radius * Math.sin(angle);
    const x2 = cx + radius * Math.cos(end); const y2 = cy + radius * Math.sin(end);
    const path = `<path d=\"M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}\" fill=\"none\" stroke=\"${item.color}\" stroke-width=\"${stroke}\" stroke-linecap=\"round\"/>`;
    angle = end;
    return path;
  }).join('');
  const legend = items.slice(0, 5).map((item) => `<div class=\"legend-row\"><span class=\"legend-dot\" style=\"background:${item.color}\"></span><span>${esc(item.name)}</span><strong>${Math.round(item.amount / total * 100)}%</strong></div>`).join('');
  return `<div class=\"donut-wrap\"><svg class=\"donut\" viewBox=\"0 0 208 208\" role=\"img\" aria-label=\"Pengeluaran per kategori\"><circle cx=\"104\" cy=\"104\" r=\"72\" fill=\"none\" stroke=\"#e8eee8\" stroke-width=\"24\"/>${paths}<text x=\"104\" y=\"99\" text-anchor=\"middle\" class=\"donut-total\">${esc(centerLabel)}</text><text x=\"104\" y=\"120\" text-anchor=\"middle\" class=\"donut-caption\">pengeluaran</text></svg><div class=\"legend\">${legend}</div></div>`;
};

export const groupedBars = (labels, values) => {
  const max = Math.max(...values.flatMap((value) => [value.income, value.spending]), 1);
  const chartW = 560; const base = 190; const groupW = 82;
  const bars = values.map((value, index) => {
    const x = 42 + index * groupW;
    const incomeH = Math.max(4, value.income / max * 145); const spendH = Math.max(4, value.spending / max * 145);
    return `<rect x=\"${x}\" y=\"${base - incomeH}\" width=\"22\" height=\"${incomeH}\" rx=\"7\" fill=\"#2f6b4f\"/><rect x=\"${x + 28}\" y=\"${base - spendH}\" width=\"22\" height=\"${spendH}\" rx=\"7\" fill=\"#e5b56a\"/><text x=\"${x + 25}\" y=\"218\" text-anchor=\"middle\">${esc(labels[index])}</text>`;
  }).join('');
  return `<svg class=\"bar-chart\" viewBox=\"0 0 ${chartW} 240\" preserveAspectRatio=\"none\" role=\"img\" aria-label=\"Pendapatan dan pengeluaran enam bulan\"><line x1=\"34\" y1=\"190\" x2=\"550\" y2=\"190\" stroke=\"#d8e4d9\"/><line x1=\"34\" y1=\"118\" x2=\"550\" y2=\"118\" stroke=\"#edf2ed\"/><line x1=\"34\" y1=\"46\" x2=\"550\" y2=\"46\" stroke=\"#edf2ed\"/>${bars}<g class=\"bar-key\"><circle cx=\"408\" cy=\"18\" r=\"5\" fill=\"#2f6b4f\"/><text x=\"420\" y=\"22\">Pendapatan</text><circle cx=\"502\" cy=\"18\" r=\"5\" fill=\"#e5b56a\"/><text x=\"514\" y=\"22\">Keluar</text></g></svg>`;
};

export const progressBar = (value, cap, tone = 'green') => {
  const percent = cap ? Math.min(100, Math.round(value / cap * 100)) : 0;
  return `<div class=\"progress-track\"><span class=\"progress-fill ${tone}\" style=\"width:${percent}%\"></span></div>`;
};
