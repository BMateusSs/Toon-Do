export function formatDate(dataString) {
  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const mesesDoAno = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

  const data = new Date(dataString);

  const diaDaSemana = diasDaSemana[data.getDay()];
  const diaDoMes = data.getDate();
  const mes = mesesDoAno[data.getMonth()];

  return `${diaDaSemana}, ${diaDoMes} ${mes}`;
}

export function darkenColor(hex, percent) {
    
    hex = hex.replace(/^#/, '');

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = Math.floor(r * (100 - percent) / 100);
    g = Math.floor(g * (100 - percent) / 100);
    b = Math.floor(b * (100 - percent) / 100);

    r = (r < 0) ? 0 : r;
    g = (g < 0) ? 0 : g;
    b = (b < 0) ? 0 : b;

    const toHex = (c) => ('0' + c.toString(16)).slice(-2);
    return '#' + toHex(r) + toHex(g) + toHex(b);
}