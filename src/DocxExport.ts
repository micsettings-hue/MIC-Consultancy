/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, LevelFormat, BorderStyle, WidthType,
  ShadingType, PageBreak
} from 'docx';
import { PlaybookState } from './types';

// Palette definitions matching your custom theme
const C = {
  navy:    "1A3557",
  blue:    "2E6DB4",
  accent:  "E8912A",
  light:   "EAF1FB",
  mint:    "E6F4F1",
  amber:   "FFF4E0",
  gray:    "F5F7FA",
  border:  "CBD6E2",
  text:    "1E2D3D",
  muted:   "5A6A7A",
  white:   "FFFFFF",
};

const border = (color = C.border) => ({
  top:    { style: BorderStyle.SINGLE, size: 1, color },
  bottom: { style: BorderStyle.SINGLE, size: 1, color },
  left:   { style: BorderStyle.SINGLE, size: 1, color },
  right:  { style: BorderStyle.SINGLE, size: 1, color },
});

const PAGE_W = 9360; // Standard layout width

const sp = (before = 0, after = 0, line: number | null = null) => {
  const s: any = { before, after };
  if (line) s.line = line;
  return s;
};

// Paragraph helpers
const h1 = (text: string) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: sp(360, 120),
  children: [new TextRun({ text, bold: true, size: 34, font: "Arial", color: C.white })],
  shading: { fill: C.navy, type: ShadingType.CLEAR },
  indent: { left: 240, right: 240 },
});

const h2 = (text: string, color = C.navy) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: sp(300, 80),
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.accent, space: 4 } },
  children: [new TextRun({ text, bold: true, size: 28, font: "Arial", color })],
});

const h3 = (text: string) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: sp(200, 60),
  children: [new TextRun({ text, bold: true, size: 24, font: "Arial", color: C.blue })],
});

const p = (text: string, opts: any = {}) => new Paragraph({
  spacing: sp(60, 60, 276),
  children: [new TextRun({
    text,
    size: 22,
    font: "Arial",
    color: opts.color || C.text,
    bold: opts.bold || false,
    italics: opts.italic || false,
  })],
  alignment: opts.align || AlignmentType.LEFT,
});

const blank = (n = 1) => Array.from({ length: n }, () => new Paragraph({ spacing: sp(0, 0), children: [new TextRun("")] }));

const bullet = (text: string, level = 0, ref = "bullets") => new Paragraph({
  numbering: { reference: ref, level },
  spacing: sp(40, 40, 260),
  children: [new TextRun({ text, size: 22, font: "Arial", color: C.text })],
});

const numbered = (text: string, level = 0) => bullet(text, level, "numbers");

const divider = () => new Paragraph({
  spacing: sp(120, 120),
  border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: C.border, space: 1 } },
  children: [new TextRun("")],
});

// Grid Table Custom Creator
const twoColExport = (rows: string[][], colW = [4680, 4680], headerFill = C.navy) =>
  new Table({
    width: { size: PAGE_W, type: WidthType.DXA },
    columnWidths: colW,
    rows: rows.map((row, ri) =>
      new TableRow({
        children: row.map((cell, ci) =>
          new TableCell({
            borders: border(),
            width: { size: colW[ci] || colW[colW.length - 1], type: WidthType.DXA },
            shading: { fill: ri === 0 ? headerFill : (ri % 2 === 0 ? C.gray : C.white), type: ShadingType.CLEAR },
            margins: { top: 100, bottom: 100, left: 160, right: 160 },
            children: [new Paragraph({
              children: [new TextRun({
                text: cell || "",
                bold: ri === 0,
                size: 20,
                font: "Arial",
                color: ri === 0 ? C.white : C.text,
              })],
            })],
          })
        ),
      })
    ),
  });

// Info box (shaded callout)
const infoBoxElement = (title: string, lines: string[], fillColor = C.light) =>
  new Table({
    width: { size: PAGE_W, type: WidthType.DXA },
    columnWidths: [PAGE_W],
    rows: [
      new TableRow({
        children: [new TableCell({
          borders: border(C.blue),
          width: { size: PAGE_W, type: WidthType.DXA },
          shading: { fill: fillColor, type: ShadingType.CLEAR },
          margins: { top: 120, bottom: 120, left: 200, right: 200 },
          children: [
            new Paragraph({ spacing: sp(0, 80), children: [new TextRun({ text: title, bold: true, size: 22, font: "Arial", color: C.navy })] }),
            ...lines.map(l => new Paragraph({ spacing: sp(30, 30, 260), children: [new TextRun({ text: l, size: 21, font: "Arial", color: C.text })] })),
          ],
        })],
      }),
    ],
  });

/**
 * Builds the complete docx file on the client using the captured state
 */
export async function exportPlaybookToDocx(state: PlaybookState): Promise<Blob> {
  const name = state.brandClarity.companyName || "My Client Brand";

  // Build Competitor Analysis Rows dynamic matrix
  const compHeader = ["Metric", name, ...state.competitors.map(c => c.name || "Competitor")];
  // Pads if fewer competitors
  while (compHeader.length < 5) compHeader.push("Competitor");

  const buildCompRow = (metric: string, key: keyof typeof state.competitors[0] | ((c: typeof state.competitors[0]) => string)) => {
    const cells = [metric];
    // Brand is index 0 (approximate from brandClarity) or average
    cells.push(metric === "Pricing Tier" ? "Mid-to-Premium" : metric === "Has Ads?" ? "Testing" : "Custom Strategy");
    state.competitors.forEach(c => {
      if (typeof key === "function") {
        cells.push(key(c));
      } else {
        cells.push(String(c[key] || ""));
      }
    });
    while (cells.length < 5) cells.push("");
    return cells;
  };

  const compMatrixRows = [
    compHeader,
    buildCompRow("Pricing Tier", "pricing"),
    buildCompRow("Primary Channel", "channel"),
    buildCompRow("Content Frequency", "frequency"),
    buildCompRow("Ad Presence", c => c.hasAds ? "Yes" : "No"),
    buildCompRow("Website Quality", c => String(c.websiteScore)),
    buildCompRow("Audience Engagement", "engagement"),
    buildCompRow("Unique Selling Point", "usp"),
    buildCompRow("Key Weakness", "weakness"),
  ];

  // Section 4 scorecard rows
  const scorecardRows = [
    ["Area", "Score (1–5)", "Key Observation/Target Actions"],
    ...state.scorecard.map(m => [m.label, String(m.score), m.notes || "Ready to implement standard guidelines"]),
  ];

  // Activities score alignment
  const taskRows = [
    ["Activity", "Client Importance", "Recommended Timing"],
    ...state.tasks.map(t => [t.title, t.clientPriority, t.defaultPriority]),
  ];

  // Weekly progress tracker
  const weekProgressRows = [
    ["Week", "Actions Completed", "Top Win", "Biggest Challenge", "Next Focus Week"],
    ...state.weeklyProgress.map(w => [w.weekName, w.actions || "Planned", w.wins || "N/A", w.challenges || "None", w.focus || "Next actions"]),
  ];

  // Build positioning statement
  const targetPos = state.brandClarity.targetAudience || "[TARGET AUDIENCE]";
  const problemPos = state.brandClarity.coreProblem || "[NEED OR PROBLEM]";
  const companyPos = name;
  const productPos = state.brandClarity.productService || "[CATEGORY]";
  const promisePos = state.brandClarity.brandPromise || "[KEY BENEFIT]";
  const voicePos = state.brandClarity.brandVoice || "[VOICE ADJECTIVES]";

  const posSentence = `For ${targetPos} who struggle with ${problemPos}, ${companyPos} is the digital launchpad that delivers ${promisePos} with a ${voicePos} voice — unlike generic alternatives who offer fragmented advice.`;

  const doc = new Document({
    numbering: {
      config: [
        { reference: "bullets", levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 600, hanging: 300 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 960, hanging: 300 } } } },
        ]},
        { reference: "numbers", levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 600, hanging: 300 } } } },
        ]},
        { reference: "alpha", levels: [
          { level: 0, format: LevelFormat.LOWER_LETTER, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 600, hanging: 300 } } } },
        ]},
      ],
    },
    styles: {
      default: {
        document: { run: { font: "Arial", size: 22, color: C.text } },
      },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 34, bold: true, font: "Arial", color: C.white },
          paragraph: { spacing: sp(360, 120), outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 28, bold: true, font: "Arial", color: C.navy },
          paragraph: { spacing: sp(300, 80), outlineLevel: 1 } },
        { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 24, bold: true, font: "Arial", color: C.blue },
          paragraph: { spacing: sp(200, 60), outlineLevel: 2 } },
      ],
    },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
        },
      },
      children: [
        // COVER
        new Paragraph({
          spacing: sp(1440, 0),
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "MIC", bold: true, size: 96, font: "Arial", color: C.navy })],
        }),
        new Paragraph({
          spacing: sp(0, 60),
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Marketing & Innovation Collective", size: 28, font: "Arial", color: C.muted })],
        }),
        divider(),
        new Paragraph({
          spacing: sp(80, 20),
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "ONE-TIME BRAND LAUNCH", bold: true, size: 52, font: "Arial", color: C.accent })],
        }),
        new Paragraph({
          spacing: sp(0, 0),
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: `1:1 Consultancy Playbook for ${name}`, bold: true, size: 40, font: "Arial", color: C.blue })],
        }),
        new Paragraph({
          spacing: sp(80, 0),
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Full Service Scope · Interactive Workshops · Growth Guidelines", size: 24, font: "Arial", color: C.muted, italics: true })],
        }),
        ...blank(2),
        twoColExport([
          ["Field", "Details"],
          ["Brand Launch Client", name],
          ["Service Type", "One-Time Brand Launch 1:1 Consultancy"],
          ["Primary Audience Target", targetPos],
          ["Budget Guidelines", state.brandClarity.monthlyAdBudget || "Not Set"],
          ["Target Deliverable", "Audit Report · 90-Day Roadmap · Word Export"],
          ["Consultation Scope", "Discovery, Competitive Alignment & Roadmap presentation"],
        ]),
        ...blank(2),
        new Paragraph({
          spacing: sp(0, 0),
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Dynamically Exported Strategy Playbook  |  MIC Internal Client File", size: 18, font: "Arial", color: C.muted, italics: true })],
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // SECTION 1
        h1("SECTION 1: SERVICE OVERVIEW & DYNAMIC BRAND SCOPE"),
        ...blank(1),
        h2("1.1  What is the Brand Launch Consultancy for " + name + "?"),
        p(`This custom-built 1:1 strategy playbook aligns the product "${productPos}" by "${name}" to dominate the modern marketing space. In 7 highly collaborative days, our consultancy enables the brand to address its biggest gap: "${state.brandClarity.biggestGap}" and transition dynamically towards a 12-month goal of: "${state.brandClarity.vision12m}".`),
        ...blank(1),

        h2("1.2  Full Asset & Digital Performance Scorecard"),
        p("The following audit details represent current ratings evaluated live with the client during active coaching:"),
        ...blank(1),
        twoColExport(scorecardRows, [2400, 1500, 5460]),
        ...blank(1),

        h2("1.3  High-Impact Growth Timeline & Roadmap Preview"),
        twoColExport([
          ["Day", "Consultancy Alignment Sprint"],
          ["Day 1", "Session 1 — Discovery & Full Brand Scorecard Audit Completed (60-90 min)"],
          ["Day 2", "MIC Competitor Gap Analysis and positioning formulation"],
          ["Day 3", "Session 2 — Competitor Mapping & Positioning Statement Validation (60 min)"],
          ["Day 4-5", "Roadmap construction & action item prioritization"],
          ["Day 6", "Session 3 — Interactive 90-Day Strategy Playbook Hand-off (60 min)"],
          ["Day 14", "Pre-scheduled Day 14 follow-up alignment call and KPI verification"],
        ]),
        new Paragraph({ children: [new PageBreak()] }),

        // SECTION 2
        h1("SECTION 2: SESSION WORKSHOPS & VERIFICATION SYSTEMS"),
        ...blank(1),

        h2("2.1  Session 1 - Deep Brand Discovery Data"),
        p("Ideal Customer Segment", { bold: true }),
        p(state.brandClarity.idealCustomer || "Not specified"),
        ...blank(1),
        p("Core Value & Product Proposition", { bold: true }),
        p(`Our primary offer, "${productPos}", directly resolves the challenge: "${problemPos}".`),
        ...blank(1),
        p("Growth Vision & Success Factors", { bold: true }),
        bullet(`12-Month Target: ${state.brandClarity.vision12m}`),
        bullet(`3-Year Vision: ${state.brandClarity.vision3y}`),
        ...blank(1),

        h2("2.2  Session 2 - Positioning Matrix & Competitor Benchmarks"),
        p("Below is the competitor grading scorecard formulated in Session 2 to help differentiate " + name + " in the regional digital ecosystem:"),
        ...blank(1),
        twoColExport(compMatrixRows, [2000, 1840, 1840, 1840, 1840]),
        ...blank(1),

        infoBoxElement("Validated Positioning Statement", [
          posSentence,
          "",
          "Tone of Voice Keywords: " + (state.brandClarity.brandVoice || "Strategic, Direct, Professional")
        ], C.amber),
        new Paragraph({ children: [new PageBreak()] }),

        // SECTION 3
        h1("SECTION 3: ACTION ROADMAPS & TACTICAL GUIDELINES"),
        ...blank(1),
        h2("3.1  Interactive Priority Stack Decisions"),
        p("These operational prioritizations dictate target channels and resources allocated for Days 1 to 90:"),
        ...blank(1),
        twoColExport(taskRows, [4500, 2400, 2460]),
        ...blank(1),

        h2("3.2  Content Production & Allocation Guidelines"),
        bullet("EDUCATE (35%) — Target common misunderstandings regarding product benefits."),
        bullet("INSPIRE (25%) — Showcase customer case-studies, testimonials, and brand origins."),
        bullet("ENTERTAIN (25%) — Behind-the-scenes content highlighting authentic operations."),
        bullet("CONVERT (15%) — High-converting call-to-actions targeting primary landing pages."),
        ...blank(1),

        h2("3.3  Financial Benchmark Guidelines"),
        twoColExport([
          ["Metric", "Acceptable Target", "Growth Objective", "Outstanding Outcome"],
          ["CTR", "0.8 - 1.2%", "1.5 - 2.5%", "3%+"],
          ["Cost per Click", "BDT 10-15", "BDT 6-10", "BDT 3-5"],
          ["Landing Page CVR", "1 - 2%", "3 - 5%", "7%+"],
        ]),
        new Paragraph({ children: [new PageBreak()] }),

        // SECTION 4
        h1("SECTION 4: WEEKLY ACTIVITY RECORD & PROGRESS LOG"),
        ...blank(1),
        p("This operational sheet tracks live actions during the 30 days following the consultancy brand launch:"),
        ...blank(1),
        twoColExport(weekProgressRows, [1600, 2200, 1800, 1800, 1960]),
        ...blank(1),

        h2("4.1  Internal Quality Assurance Audit Checklist"),
        bullet("[x] Completed and verified brand audit metrics"),
        bullet("[x] Live competitor grading matrix fully aligned"),
        bullet("[x] Action priorities selected and synced with monthly budget constraints"),
        bullet("[x] 90-Day tactical milestones assigned to core team/consultants"),
        bullet("[ ] Active follow-up call booked for Day 14"),
        ...blank(1),
        p("General Consult Notes & Custom Advice:", { bold: true }),
        p(state.comments || "Continue tracking indicators weekly. Focus Month 1 heavily on brand consistency and high-impact quick wins to capture warm traffic.", { italic: true }),
        ...blank(1),

        divider(),
        new Paragraph({
          spacing: sp(120, 0),
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "MIC — Marketing & Innovation Collective", bold: true, size: 22, font: "Arial", color: C.navy })],
        }),
        new Paragraph({
          spacing: sp(40, 0),
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Generated securely via MIC Strategy Builder. Version 1.1", size: 18, font: "Arial", color: C.muted, italics: true })],
        }),
      ]
    }]
  });

  return Packer.toBlob(doc);
}
