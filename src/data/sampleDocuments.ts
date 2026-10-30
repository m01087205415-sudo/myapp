import { DocumentItem } from '../types';
import { calculateMetrics, extractSections } from '../utils/documentUtils';

const doc1Text = `# MASTER SERVICES AGREEMENT (ENTERPRISE EDITION)
**Contract Reference:** MSA-2026-APEX-884
**Effective Date:** January 15, 2026
**Governing Jurisdiction:** State of Delaware, United States

BETWEEN:
1. **HYPERSCALE SYSTEMS INC.**, a Delaware corporation having its principal office at 400 Technology Square, Cambridge, MA ("Provider"), and
2. **GLOBAL HORIZON FINANCIAL GROUP PLC**, a public limited company having its registered office at 25 Bank Street, London, UK ("Customer").

---

### SECTION 1. DEFINITIONS AND ENGAGEMENT SCOPE
1.1 **"Platform Services"** means Provider's proprietary distributed workflow and document synthesis API suite deployed across multi-region tenant clusters.
1.2 **"Customer Data"** means all electronic records, source documents, compliance transcripts, and confidential payloads ingested by Customer into the Platform Services.
1.3 Provider shall deliver the Platform Services in conformity with Exhibit A (Service Level Agreement) and Exhibit B (Data Protection Addendum).

### SECTION 2. SERVICE LEVEL COMMITMENTS & REMEDIES
2.1 **System Availability:** Provider warrants that the Platform Services shall maintain a monthly uptime percentage of not less than **99.95%** ("Uptime Target"), measured on a calendar-month basis excluding scheduled maintenance windows.
2.2 **Service Credits:** If Provider fails to satisfy the Uptime Target, Customer shall be entitled to the following fee credits against subsequent billing cycles:
- Uptime 99.50% to 99.94%: 10% credit of monthly Platform Fee.
- Uptime 99.00% to 99.49%: 25% credit of monthly Platform Fee.
- Uptime below 99.00%: 50% credit of monthly Platform Fee.
2.3 Service credits represent Customer's sole monetary remedy for availability breaches, without prejudice to termination rights under Section 7.2.

### SECTION 3. FEES, PAYMENT SCHEDULE & AUDIT RIGHTS
3.1 **Annual Subscription:** Customer shall remit an annual platform fee of **$480,000 USD**, invoiced net thirty (30) calendar days from receipt of electronic invoice.
3.2 **Late Remittance:** Delinquent balances accrue interest at the lesser of 1.25% per month or the statutory maximum permissible under Delaware law.
3.3 **Audit Verification:** Customer may, upon thirty (30) days prior written notice, engage an independent AICPA-certified audit firm to review Provider's SOC-2 Type II controls and security posture during normal operating hours.

### SECTION 4. INTELLECTUAL PROPERTY & DERIVATIVE WORK
4.1 **Customer Ownership:** Customer exclusively retains all right, title, and ownership in Customer Data and all derived analytical outputs, extracted entities, and synthesized summaries.
4.2 **Provider Intellectual Property:** Provider retains all rights in foundational models, algorithms, runtime agents, and proprietary system firmware. Customer is granted a non-exclusive, non-sublicensable license solely during the Term.
4.3 **No Model Training:** Provider unequivocally covenants that Customer Data shall **NEVER** be utilized for training, fine-tuning, or parameter adaptation of public foundation models.

### SECTION 5. CONFIDENTIALITY & DATA PROTECTION (GDPR / CCPA)
5.1 Each party agrees to safeguard Confidential Information using at least the same degree of care it uses for its own sensitive assets (and no less than reasonable care).
5.2 Provider shall comply with ISO/IEC 27001 standards and enforce AES-256 encryption at rest and TLS 1.3 in transit across all endpoints.
5.3 In the event of an authenticated Data Incident involving Customer Data, Provider shall notify Customer's Chief Information Security Officer within **twenty-four (24) hours** of confirmation.

### SECTION 6. INDEMNIFICATION & IP DEFENSE
6.1 Provider shall defend, indemnify, and hold harmless Customer against any third-party claim, suit, or proceeding alleging that the Platform Services infringe any valid copyright, patent, or trade secret.
6.2 Customer shall defend and hold harmless Provider against any third-party claim arising from Customer Data uploaded in direct violation of applicable export controls or privacy statutes.

### SECTION 7. LIMITATION OF LIABILITY
7.1 **Consequential Damages Waiver:** Neither party shall be liable to the other for indirect, incidental, punitive, or consequential damages, including lost revenue or reputational harm.
7.2 **General Aggregate Cap:** Except for breaches of Section 5 (Confidentiality) and Section 6.1 (IP Indemnity), each party's total aggregate liability under this Agreement shall not exceed **two times (2x) the total fees paid** in the twelve (12) months preceding the cause of action ($960,000 USD).
7.3 **Supercap for Data Breach:** Liability arising strictly from an unexcused, material breach of Exhibit B resulting in unauthorized data exfiltration shall be capped at **$5,000,000 USD**.

### SECTION 8. TERM AND TERMINATION
8.1 **Initial Term:** This Agreement shall take effect on the Effective Date and remain operative for thirty-six (36) months ("Initial Term").
8.2 **Termination for Cause:** Either party may terminate immediately upon written notice if the other party commits a material breach and fails to cure within thirty (30) days of receiving formal notice.
8.3 **Post-Termination Transition:** Provider shall deliver a machine-readable export (JSON/Parquet) of all Customer Data within fifteen (15) days of termination and subsequently cryptographically wipe all backups within forty-five (45) days.
`;

const doc2Text = `# APEX-9: DISTRIBUTED MULTI-AGENT REASONING ARCHITECTURE
**Document ID:** ARCH-SPEC-2026-V3
**Status:** Approved for Core Production Rollout
**Principal Authors:** Platform Architecture Group, Distributed Systems Research

---

### 1. SYSTEM OVERVIEW & LATENCY OBJECTIVES
The Apex-9 platform is an asynchronous DAG-orchestrated multi-agent architecture engineered for high-throughput document intelligence, iterative verification, and structured telemetry extraction.
- **P50 Latency:** 380 ms across dual-agent verification pipelines.
- **P99 Latency:** 1,420 ms under heavy payload concurrency (500 simultaneous queries).
- **Consensus Invariant:** At least two distinct reasoning nodes must converge on structured entity bounds prior to storage commit.

### 2. CORE ARCHITECTURAL LAYERS
The runtime consists of four decoupled micro-layers operating across distributed worker pods:
1. **Ingestion & Semantic Tokenizer:** Splits high-density documents into token-aware context windows (maximum 128,000 tokens per sub-graph) with recursive header boundary preservation.
2. **Primary Extraction Agent (Node Alpha):** Generates candidate fact trees, key-value mappings, and causal claims using zero-shot and few-shot grounding schemas.
3. **Adversarial Verification Agent (Node Beta):** Reviews candidate fact trees from Node Alpha specifically searching for hallucinated spans, inverted logic, missing citations, or numerical discrepancies.
4. **Synthesis & Reconciliation Arbiter (Node Gamma):** Emits final validated payloads with confidence scores and exact character-span citations.

### 3. PROTOCOL FOR TOOL CALLING & SYSTEM CONSTRAINTS
- **Tool Calling Latency Budget:** 200 ms timeout per external deterministic tool call (e.g. currency converter, database lookup, OCR bounding box checker).
- **Fallback Policy:** If an external tool invocation fails after two exponential backoff attempts (100 ms, 300 ms), the agent must gracefully degrade by annotating the output with an explicit fallback notice.
- **Memory Retention Window:** Active conversational memory persists for 24 hours in distributed Redis clusters; document embeddings are kept in vector indices with HNSW cosine distance metrics.

### 4. FAULT TOLERANCE & NETWORK PARTITIONING
Under conditions of network partition (CAP theorem adherence to CP - Consistency & Partition Tolerance):
- Read operations remain available from replica read nodes.
- Mutation or schema write operations are paused until quorum is restored (minimum 3 of 5 consensus nodes).
- Automated health-check probes poll every 5,000 ms; consecutive failures exceeding 3 trigger pod eviction.
`;

const doc3Text = `# BIOGENIX THERAPEUTICS - CLINICAL TRIAL PROTOCOL (PHASE IIb)
**Protocol Identifier:** BGT-402-ONC-02
**Investigational Product:** CX-882 (Oral Dual Pan-Kinase Inhibitor)
**Indication:** Relapsed or Refractory Metastatic Non-Small Cell Lung Carcinoma (NSCLC)
**Sponsor:** BioGenix Therapeutics AG, Basel, Switzerland

---

### SECTION 1. TRIAL OBJECTIVES AND ENDPOINTS
1.1 **Primary Endpoint:**
- Progression-Free Survival (PFS) evaluated by blinded independent central review (BICR) according to RECIST v1.1 criteria at 24 weeks post-randomization.
1.2 **Secondary Endpoints:**
- Overall Response Rate (ORR): Confirmed complete response (CR) or partial response (PR).
- Duration of Response (DoR): Time from initial objective response documentation until progression or death.
- Overall Survival (OS) evaluated at 12 and 24 months.
- Safety profile and tolerability characterization per NCI CTCAE v5.0.

### SECTION 2. PATIENT SELECTION & COHORT STRATIFICATION
2.1 **Inclusion Criteria:**
- Male or female participants aged $\ge 18$ years at the time of written informed consent.
- Histologically confirmed advanced or metastatic NSCLC with documented EGFR Exon 20 insertion or KRAS G12C mutation.
- Prior progression on or following at least one platinum-based doublet chemotherapy regimen.
- Eastern Cooperative Oncology Group (ECOG) performance status of 0 or 1.
- Adequate baseline organ function: Absolute Neutrophil Count (ANC) $\ge 1,500/\mu\text{L}$, Platelets $\ge 100,000/\mu\text{L}$, Total Bilirubin $\le 1.5\times\text{ULN}$, Serum Creatinine Clearance $\ge 50\text{ mL/min}$.
2.2 **Exclusion Criteria:**
- Symptomatic untreated central nervous system (CNS) metastases or carcinomatous meningitis.
- Clinically significant active cardiovascular disease (QTc prolongation $> 470\text{ ms}$, LVEF $< 50\%$).
- Concomitant administration of strong CYP3A4 inhibitors or inducers within 14 days of Day 1.

### SECTION 3. DOSAGE, TITRATION AND MODIFICATION GUIDELINES
3.1 **Starting Dose:** CX-882 administered orally at **150 mg once daily (QD)** with a light meal.
3.2 **Dose Reductions:**
- Level -1: 100 mg QD.
- Level -2: 75 mg QD.
- Below 75 mg: Permanent discontinuation of investigational product.
3.3 **Adverse Event Management:** Any Grade 3 or higher treatment-related non-hematologic toxicity mandates drug withholding until resolution to Grade $\le 1$.
`;

const doc4Text = `# HORIZON VENTURES: Q3 QUARTERLY LP MEMORANDUM & PORTFOLIO REVIEW
**Fund Identifier:** Horizon Frontier Growth Fund III LP
**Reporting Period:** Q3 Ending September 30, 2026
**Managing General Partner:** Marcus Vance, General Partner

---

### 1. FUND PERFORMANCE HIGHLIGHTS & FINANCIAL METRICS
- **Committed Capital:** $650,000,000 USD
- **Called Capital to Date:** $415,000,000 USD (63.8% of aggregate commitment)
- **Cumulative Distributions (DPI):** 0.42x ($174,300,000 USD returned)
- **Residual Value (RVPI):** 2.18x ($904,700,000 USD net asset value)
- **Total Value to Paid-In (TVPI):** **2.60x**
- **Net Internal Rate of Return (Net IRR):** **27.4%** since inception (Vintage 2022)

### 2. TOP PERFORMING PORTFOLIO ASSETS
1. **QuantumFlow Inc. (Series C):**
   - Initial Investment: $25M at $180M post-money valuation.
   - Latest Round: $120M led by Sequoia at $1.45B valuation.
   - Unrealized Gain: 7.2x MOIC ($180M mark-to-market value).
   - Key Catalyst: Enterprise ARR surged from $18M to $54M (+200% YoY growth).
2. **Kinetix Robotics (Series B):**
   - Initial Investment: $18M at $90M post-money valuation.
   - Current Carrying Value: $58.5M (3.25x MOIC).
   - Milestone: Commercial deployment of 400 humanoid warehouse sorting units with DHL.
3. **Synthetix Health (Series A):**
   - Carrying Value: $31.0M (2.4x MOIC).
   - Milestone: Fast-track regulatory designation granted by the FDA for oncology screening.

### 3. MACRO RISKS & CAPITAL DEPLOYMENT OUTLOOK
- **Follow-On Reserve:** $145,000,000 USD earmarked for pro-rata defense in top 4 growth assets.
- **Exit Liquidity Pipeline:** Two prospective IPO filings targeted for Q2/Q3 2027 dependent on NASDAQ enterprise software multiples.
- **Next Capital Call:** Scheduled for November 15, 2026 for $45,000,000 USD to fund follow-on rounds in CloudCore and QuantumFlow.
`;

function createDoc(id: string, title: string, category: any, content: string, tags: string[]): DocumentItem {
  const metrics = calculateMetrics(content);
  const sections = extractSections(content);
  return {
    id,
    title,
    category,
    content,
    createdAt: '2026-10-20T09:00:00Z',
    updatedAt: '2026-10-29T14:30:00Z',
    wordCount: metrics.wordCount,
    charCount: metrics.charCount,
    estimatedTokens: metrics.estimatedTokens,
    readingTimeMinutes: metrics.readingTimeMinutes,
    sections,
    tags,
  };
}

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  createDoc(
    'doc-msa-legal',
    'Master Services Agreement (MSA)',
    'Legal & Contracts',
    doc1Text,
    ['Legal', 'SLA', 'Liabilities', 'Delaware', 'Enterprise']
  ),
  createDoc(
    'doc-arch-whitepaper',
    'Apex-9 Multi-Agent Architecture Spec',
    'Technical & Engineering',
    doc2Text,
    ['Distributed Systems', 'Agents', 'P99 Latency', 'Consensus']
  ),
  createDoc(
    'doc-clinical-trial',
    'BioGenix Clinical Trial Protocol (Phase IIb)',
    'Research & Clinical',
    doc3Text,
    ['Oncology', 'Clinical Trial', 'Endpoints', 'FDA', 'Protocol']
  ),
  createDoc(
    'doc-lp-memo',
    'Horizon Ventures Q3 LP Memorandum',
    'Financial & Corporate',
    doc4Text,
    ['Venture Capital', 'IRR', 'TVPI', 'Portfolio', 'Financial']
  ),
];
