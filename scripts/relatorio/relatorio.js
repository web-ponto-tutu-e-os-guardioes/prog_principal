import { renderList } from './render.js';
import { gerarTxt } from './txtExport.js';

document.addEventListener('DOMContentLoaded', renderList);

const btnExportarPDF = document.getElementById('btn-exportar-pdf');
btnExportarPDF.addEventListener('click', gerarTxt);