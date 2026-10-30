import { PromptRecipe } from '../types';

export const PROMPT_RECIPES: PromptRecipe[] = [
  {
    id: 'executive-summary',
    title: 'Executive Strategic Synthesis',
    category: 'Synthesis & Briefings',
    badge: 'High Impact',
    description: 'Condenses dense complex documentation into decision-grade executive briefs with key takeaways and critical risks.',
    systemInstruction: 'You are a Senior Strategic Advisory Partner to the C-Suite and Board of Directors. Your tone is crisp, rigorous, and completely devoid of fluff.',
    promptTemplate: `Analyze the provided document: "{{doc_title}}" for an executive leadership audience.

Produce a strategic briefing with the following structure:
1. **Executive Abstract**: A 3-sentence high-level encapsulation of purpose, parties, and scope.
2. **Core Operational Pillars / Key Terms**: 3 to 5 structured points outlining foundational obligations, metrics, or requirements.
3. **Strategic Vulnerabilities & Critical Exposure**: Direct bulleted assessment of highest exposure areas (financial, operational, technical, or legal).
4. **Immediate Action Items & Next Steps**: Concrete next milestones with recommended owner and timeframe.

Tone: {{tone}}
Target Decision Maker: {{audience}}
Focus Directive: {{focus_directive}}

Document Text:
"""
{{document_full}}
"""`,
    defaultVariables: [
      { key: 'tone', label: 'Tone of Briefing', value: 'Direct, objective, executive-level' },
      { key: 'audience', label: 'Target Decision Maker', value: 'Chief Executive Officer & General Counsel' },
      { key: 'focus_directive', label: 'Specific Focus Directive', value: 'Highlight commitments, monetary liabilities, and timeline risks' },
    ],
  },
  {
    id: 'contract-risk-audit',
    title: 'Legal Redline & Liability Auditor',
    category: 'Risk & Compliance',
    badge: 'Legal Audit',
    description: 'Thoroughly reviews clauses, identifies uncapped liabilities, missing bilateral protections, and suggests exact redline edits.',
    systemInstruction: 'You are an elite corporate commercial contracts attorney specializing in high-stakes technology and enterprise agreements.',
    promptTemplate: `Conduct an adversarial contract audit on "{{doc_title}}".

Focus on identifying:
1. **Uncapped or Disproportionate Liabilities**: Evaluate liability limits, supercaps, and carve-outs against standard commercial norms.
2. **Ambiguous or Unilateral Obligations**: Flag provisions that place indefinite or one-sided burdens on the counterparty.
3. **Missing Protective Provisions**: Identify standard boilerplate covenants that are absent (e.g., force majeure, mutual non-solicitation, transition assistance).
4. **Specific Redline Recommendations**: For each flagged section, quote the current text and provide an exact, balanced replacement clause.

Audit Severity Threshold: {{audit_severity}}
Counterparty Position: {{counterparty_position}}

Source Document:
"""
{{document_full}}
"""`,
    defaultVariables: [
      { key: 'audit_severity', label: 'Audit Rigor', value: 'High - Protect Customer Interests' },
      { key: 'counterparty_position', label: 'Review Perspective', value: 'Customer / Buyer Entity' },
    ],
  },
  {
    id: 'json-entity-extraction',
    title: 'Structured JSON Entity Extraction',
    category: 'Data Extraction',
    badge: 'JSON Schema',
    description: 'Extracts entities, financial amounts, key dates, deadlines, and parties into strict machine-readable JSON format.',
    responseMimeType: 'application/json',
    systemInstruction: 'You are an automated deterministic document extraction parser. You always return valid JSON strictly matching the requested structure without markdown formatting or code fences.',
    promptTemplate: `Extract all critical metadata, operational metrics, entity parties, obligations, and financial commitments from "{{doc_title}}" into a clean JSON structure.

Include:
- documentTitle (string)
- partiesInvolved (array of strings)
- keyDatesAndDeadlines (array of objects with date/milestone and description)
- financialCommitments (array of objects with amount, currency, frequency, and condition)
- primaryObligations (array of strings)
- identifiedRiskFactors (array of strings)
- complianceStandards (array of strings)

Extracted data must be strictly factual from the text.

Source Document:
"""
{{document_full}}
"""`,
    defaultVariables: [],
  },
  {
    id: 'adversarial-critique',
    title: 'Adversarial Logic & Fact-Check',
    category: 'Analysis & Fact-Check',
    badge: 'Stress Test',
    description: 'Probes the document for internal contradictions, unsupported claims, unstated assumptions, and engineering or financial vulnerabilities.',
    systemInstruction: 'You are a ruthless technical and financial auditor. Your mission is to stress-test claims, expose hidden assumptions, and find flaws.',
    promptTemplate: `Perform an adversarial stress-test on "{{doc_title}}".

Evaluate:
1. **Internal Inconsistencies**: Are there sections, metrics, or statements that contradict each other?
2. **Unsupported Empirical Claims**: Where does the text state assertions without providing supporting benchmarks, baseline data, or citations?
3. **Pessimistic Failure Modes**: What happens when conditions deviate from nominal parameters (e.g. latency spikes, delayed payments, patient dropouts)?
4. **Questions for the Authors**: Formulate 5 tough, incisive questions the authors must answer before this document can be relied upon.

Adversarial Rigor: {{rigor_level}}

Source Text:
"""
{{document_full}}
"""`,
    defaultVariables: [
      { key: 'rigor_level', label: 'Rigor Level', value: 'Maximum - Zero Benefit of Doubt' },
    ],
  },
  {
    id: 'action-item-raci',
    title: 'Action Item & RACI Matrix Generator',
    category: 'Execution & Operations',
    badge: 'Operations',
    description: 'Scans the document for deliverables, conditions, and deadlines to produce an operational RACI matrix and timeline.',
    systemInstruction: 'You are an operations director and program manager skilled in turning complex documents into actionable delivery matrices.',
    promptTemplate: `Transform the commitments and directives in "{{doc_title}}" into an operational execution plan.

Generate:
1. **Immediate Deliverables Table**: Task, Suggested Owner, Due Date / Trigger, Dependencies.
2. **RACI Breakdown**:
   - Responsible (who does the work)
   - Accountable (who approves)
   - Consulted (who provides input)
   - Informed (who receives notification)
3. **Critical Path & Bottlenecks**: The single longest sequence of dependent activities where delay threatens overall execution.

Organization Context: {{org_context}}

Source Document:
"""
{{document_full}}
"""`,
    defaultVariables: [
      { key: 'org_context', label: 'Enterprise Context', value: 'Cross-functional engineering and legal deployment' },
    ],
  },
  {
    id: 'slide-bulletizer',
    title: 'Executive Slide Deck Deconstructor',
    category: 'Synthesis & Briefings',
    badge: 'Presentation',
    description: 'Distills complex documents into clean, impactful slide outlines with punchy headlines, 3 key bullets, and callout metrics.',
    systemInstruction: 'You are a presentation designer and communications strategist for top-tier venture firms and Fortune 500 leadership.',
    promptTemplate: `Deconstruct "{{doc_title}}" into a crisp, high-impact 5-slide presentation outline for a leadership review.

For each slide, specify:
- **Slide Title**: Punchy, insight-driven headline (not a generic topic label)
- **Primary Metric / Anchor Stat**: Key quantitative figure from the document
- **3 Core Takeaway Bullets**: Formatted in action-verb prose, under 18 words each
- **Speaker Note / Strategic Context**: 1-2 sentence context for the presenter

Slide Deck Goal: {{deck_goal}}

Document:
"""
{{document_full}}
"""`,
    defaultVariables: [
      { key: 'deck_goal', label: 'Presentation Objective', value: 'Brief executive committee and secure budget / approval' },
    ],
  },
];
