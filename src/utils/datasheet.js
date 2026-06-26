import { jsPDF } from 'jspdf';
import { siteConfig } from '../data/siteConfig';

// Brand palette (mirrors the CSS design tokens), as [r, g, b].
const NAVY = [10, 17, 32];
const BLUE = [37, 99, 235];
const BLUE_BRIGHT = [59, 130, 246];
const GRAY_600 = [75, 85, 99];
const GRAY_500 = [107, 114, 128];
const GRAY_400 = [156, 163, 175];
const GRAY_100 = [243, 244, 246];
const WHITE = [255, 255, 255];

function hexToRgb(hex, fallback = BLUE) {
  if (typeof hex !== 'string') return fallback;
  const m = hex.replace('#', '').match(/^[0-9a-f]{6}$/i);
  if (!m) return fallback;
  const int = parseInt(m[0], 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

// Build a branded, single-product technical datasheet from the same spec data
// that drives the catalog (src/data/productCategories.js). Returns a jsPDF doc.
export function buildDatasheet(variant, category) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const accent = hexToRgb(category?.accent);

  // ── Header band ──
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageW, 96, 'F');
  doc.setFillColor(...accent);
  doc.rect(0, 96, pageW, 4, 'F');

  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('SLG MOTORS', margin, 46);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...GRAY_400);
  doc.text(`${siteConfig.tagline} · Est. ${siteConfig.established}`, margin, 64);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...BLUE_BRIGHT);
  doc.text('PRODUCT DATASHEET', pageW - margin, 46, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...GRAY_400);
  doc.text(category?.shortName || '', pageW - margin, 64, { align: 'right' });

  // ── Badge (top-right of the body) ──
  if (variant.badge) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    const bw = doc.getTextWidth(variant.badge) + 16;
    const bx = pageW - margin - bw;
    const by = 122;
    doc.setFillColor(...accent);
    doc.roundedRect(bx, by, bw, 18, 3, 3, 'F');
    doc.setTextColor(...WHITE);
    doc.text(variant.badge, bx + 8, by + 12);
  }

  // ── Product title block ──
  let y = 144;
  doc.setTextColor(...NAVY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  const nameLines = doc.splitTextToSize(variant.name, pageW - margin * 2 - 130);
  doc.text(nameLines, margin, y);
  y += nameLines.length * 22;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...GRAY_500);
  doc.text(`${category?.name || ''} Range`, margin, y);

  // ── Tags row ──
  if (variant.tags?.length) {
    y += 22;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...BLUE);
    doc.text(variant.tags.join('    •    '), margin, y);
  }

  // ── Spec table ──
  y += 30;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...BLUE);
  doc.text('TECHNICAL SPECIFICATIONS', margin, y);
  y += 14;

  const tableX = margin;
  const tableW = pageW - margin * 2;
  const labelW = tableW * 0.4;
  const valueW = tableW * 0.6;
  const padX = 10;
  const lineH = 12;
  const rowPadY = 8;

  doc.setFontSize(9.5);
  (variant.specs || []).forEach((spec, i) => {
    const valueLines = doc.splitTextToSize(String(spec.value), valueW - padX * 2);
    const rowH = Math.max(valueLines.length, 1) * lineH + rowPadY * 2;

    // Page break guard for unusually long spec lists.
    if (y + rowH > pageH - 96) {
      doc.addPage();
      y = margin;
    }

    if (i % 2 === 0) {
      doc.setFillColor(...GRAY_100);
      doc.rect(tableX, y, tableW, rowH, 'F');
    }

    const baseline = y + rowPadY + lineH - 3;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...GRAY_600);
    doc.text(String(spec.label), tableX + padX, baseline);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...NAVY);
    doc.text(valueLines, tableX + labelW + padX, baseline);

    y += rowH;
  });

  // ── Certification note ──
  y += 22;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(...GRAY_600);
  doc.text(
    'All SLG products are ISO 9001:2015 certified and BIS compliant.',
    margin,
    y,
  );

  // ── Footer ──
  const footerY = pageH - 58;
  doc.setDrawColor(...GRAY_100);
  doc.setLineWidth(1);
  doc.line(margin, footerY - 18, pageW - margin, footerY - 18);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...NAVY);
  doc.text(siteConfig.legalName, margin, footerY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...GRAY_500);
  doc.text(
    `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    margin,
    footerY + 12,
  );
  doc.text(`${siteConfig.email}   ·   ${siteConfig.phone}`, margin, footerY + 24);

  const dateStr = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  doc.text(`Generated ${dateStr}`, pageW - margin, footerY, { align: 'right' });
  doc.text(
    'Specifications subject to change without notice.',
    pageW - margin,
    footerY + 12,
    { align: 'right' },
  );

  return doc;
}

export function downloadDatasheet(variant, category) {
  if (!variant) return;
  const doc = buildDatasheet(variant, category);
  const safeName = (variant.name || 'datasheet')
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '');
  doc.save(`SLG-Motors-${safeName}.pdf`);
}
