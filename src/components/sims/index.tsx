import { Suspense, lazy } from 'react'
import type { SimName } from '../../types'

/**
 * Simulations are code-split: each lab is a separate chunk that only loads when
 * a chapter containing it is opened. The title/blurb metadata below stays
 * synchronous, because BlockRenderer reads it during render and the content
 * validator (`scripts/check-content.ts`) imports SIMS names from here.
 */

const BudgetBuilder = lazy(() => import('./BudgetBuilder').then((m) => ({ default: m.BudgetBuilder })))
const CompoundLab = lazy(() => import('./CompoundLab').then((m) => ({ default: m.CompoundLab })))
const CoverLab = lazy(() => import('./CoverLab').then((m) => ({ default: m.CoverLab })))
const EmiLab = lazy(() => import('./EmiLab').then((m) => ({ default: m.EmiLab })))
const MarketLab = lazy(() => import('./MarketLab').then((m) => ({ default: m.MarketLab })))
const MinPaymentLab = lazy(() => import('./MinPaymentLab').then((m) => ({ default: m.MinPaymentLab })))
const NetWorthLab = lazy(() => import('./NetWorthLab').then((m) => ({ default: m.NetWorthLab })))
const RupeeTen = lazy(() => import('./RupeeTen').then((m) => ({ default: m.RupeeTen })))
const SalarySlipLab = lazy(() => import('./SalarySlipLab').then((m) => ({ default: m.SalarySlipLab })))
const ScamSpotter = lazy(() => import('./ScamSpotter').then((m) => ({ default: m.ScamSpotter })))
const SheetLab = lazy(() => import('./SheetLab').then((m) => ({ default: m.SheetLab })))
const PortfolioLab = lazy(() => import('./PortfolioLab').then((m) => ({ default: m.PortfolioLab })))
const BondLab = lazy(() => import('./BondLab').then((m) => ({ default: m.BondLab })))
const RealReturnLab = lazy(() => import('./RealReturnLab').then((m) => ({ default: m.RealReturnLab })))
const CurrencyLab = lazy(() => import('./CurrencyLab').then((m) => ({ default: m.CurrencyLab })))
const TaxLab = lazy(() => import('./TaxLab').then((m) => ({ default: m.TaxLab })))
const OptionsPayoffLab = lazy(() => import('./OptionsPayoffLab').then((m) => ({ default: m.OptionsPayoffLab })))
const ValuationLab = lazy(() => import('./ValuationLab').then((m) => ({ default: m.ValuationLab })))
const FeeDragLab = lazy(() => import('./FeeDragLab').then((m) => ({ default: m.FeeDragLab })))
const CycleLab = lazy(() => import('./CycleLab').then((m) => ({ default: m.CycleLab })))

// Level 5 labs are imported from one module per band, so a band's simulations
// load together only when a chapter from that band is opened.
const L5FirstSalarySplit = lazy(() => import('./l5').then((m) => ({ default: m.L5FirstSalarySplit })))
const L5NegotiationRounds = lazy(() => import('./l5').then((m) => ({ default: m.L5NegotiationRounds })))
const L5OfferCompare = lazy(() => import('./l5').then((m) => ({ default: m.L5OfferCompare })))
const L5CtcDecompose = lazy(() => import('./l5').then((m) => ({ default: m.L5CtcDecompose })))
const L5BenefitEvaluator = lazy(() => import('./l5-money').then((m) => ({ default: m.L5BenefitEvaluator })))
const L5PfLifecycle = lazy(() => import('./l5-money').then((m) => ({ default: m.L5PfLifecycle })))
const L5RegimePicker = lazy(() => import('./l5-money').then((m) => ({ default: m.L5RegimePicker })))
const L5MonthlyRoutine = lazy(() => import('./l5-money').then((m) => ({ default: m.L5MonthlyRoutine })))
const L5EmergencySizing = lazy(() => import('./l5-money').then((m) => ({ default: m.L5EmergencySizing })))
const L5SinkingPlanner = lazy(() => import('./l5-money').then((m) => ({ default: m.L5SinkingPlanner })))
const L5BudgetSystemPicker = lazy(() => import('./l5-money').then((m) => ({ default: m.L5BudgetSystemPicker })))
const L5ZeroBasedBuilder = lazy(() => import('./l5-money').then((m) => ({ default: m.L5ZeroBasedBuilder })))
const L5RatioStressTest = lazy(() => import('./l5-money').then((m) => ({ default: m.L5RatioStressTest })))
const L5CashflowTiming = lazy(() => import('./l5-money').then((m) => ({ default: m.L5CashflowTiming })))
const L5AutomationBlueprint = lazy(() => import('./l5-system').then((m) => ({ default: m.L5AutomationBlueprint })))
const L5SipAutomation = lazy(() => import('./l5-system').then((m) => ({ default: m.L5SipAutomation })))
const L5BillAutomationBoard = lazy(() => import('./l5-system').then((m) => ({ default: m.L5BillAutomationBoard })))
const L5AlertTuning = lazy(() => import('./l5-system').then((m) => ({ default: m.L5AlertTuning })))
const L5DashboardDesigner = lazy(() => import('./l5-system').then((m) => ({ default: m.L5DashboardDesigner })))
const L5PortfolioArchitect = lazy(() => import('./l5-invest').then((m) => ({ default: m.L5PortfolioArchitect })))
const L5AllocationDesigner = lazy(() => import('./l5-invest').then((m) => ({ default: m.L5AllocationDesigner })))
const L5OverlapChecker = lazy(() => import('./l5-invest').then((m) => ({ default: m.L5OverlapChecker })))
const L5RebalanceTrigger = lazy(() => import('./l5-invest').then((m) => ({ default: m.L5RebalanceTrigger })))
const L5GoalMapper = lazy(() => import('./l5-invest').then((m) => ({ default: m.L5GoalMapper })))
const L5ReitAnalyser = lazy(() => import('./l5-invest').then((m) => ({ default: m.L5ReitAnalyser })))
const L5InvitAnalyser = lazy(() => import('./l5-invest').then((m) => ({ default: m.L5InvitAnalyser })))
const L5GlobalDiversifier = lazy(() => import('./l5-invest').then((m) => ({ default: m.L5GlobalDiversifier })))
const L5EtfCostCheck = lazy(() => import('./l5-invest').then((m) => ({ default: m.L5EtfCostCheck })))
const L5AlternativesScreener = lazy(() => import('./l5-invest').then((m) => ({ default: m.L5AlternativesScreener })))
const L5PeWaterfall = lazy(() => import('./l5-retire').then((m) => ({ default: m.L5PeWaterfall })))
const L5VcPortfolio = lazy(() => import('./l5-retire').then((m) => ({ default: m.L5VcPortfolio })))
const L5LiquidityMap = lazy(() => import('./l5-retire').then((m) => ({ default: m.L5LiquidityMap })))
const L5TotalCostOfOwnership = lazy(() => import('./l5-retire').then((m) => ({ default: m.L5TotalCostOfOwnership })))
const L5TaxPlanner = lazy(() => import('./l5-retire').then((m) => ({ default: m.L5TaxPlanner })))
const L5RetirementProjector = lazy(() => import('./l5-retire').then((m) => ({ default: m.L5RetirementProjector })))
const L5IndependenceNumber = lazy(() => import('./l5-retire').then((m) => ({ default: m.L5IndependenceNumber })))
const L5FireStressTest = lazy(() => import('./l5-retire').then((m) => ({ default: m.L5FireStressTest })))
const L5SavingsRateLab = lazy(() => import('./l5-retire').then((m) => ({ default: m.L5SavingsRateLab })))
const L5PassiveIncomeAudit = lazy(() => import('./l5-retire').then((m) => ({ default: m.L5PassiveIncomeAudit })))
// Band three: the institutions a saver deals with, and the checks each one makes possible.
const L5JurisdictionFinder = lazy(() => import('./l5-inst').then((m) => ({ default: m.L5JurisdictionFinder })))
const L5RbiChecklist = lazy(() => import('./l5-inst').then((m) => ({ default: m.L5RbiChecklist })))
const L5SebiVerify = lazy(() => import('./l5-inst').then((m) => ({ default: m.L5SebiVerify })))
const L5InsurerVerify = lazy(() => import('./l5-inst').then((m) => ({ default: m.L5InsurerVerify })))
const L5PensionSetup = lazy(() => import('./l5-inst').then((m) => ({ default: m.L5PensionSetup })))
const L5BankPicker = lazy(() => import('./l5-inst').then((m) => ({ default: m.L5BankPicker })))
const L5NbfcCheck = lazy(() => import('./l5-inst').then((m) => ({ default: m.L5NbfcCheck })))
const L5InsurerScorecard = lazy(() => import('./l5-inst').then((m) => ({ default: m.L5InsurerScorecard })))
const L5AmcDiligence = lazy(() => import('./l5-inst').then((m) => ({ default: m.L5AmcDiligence })))
const L5ExchangeRole = lazy(() => import('./l5-inst').then((m) => ({ default: m.L5ExchangeRole })))
// Band three, batch 2: the market plumbing, the identity record, the safety nets and the paperwork.
const L5BrokerCompare = lazy(() => import('./l5-inst2').then((m) => ({ default: m.L5BrokerCompare })))
const L5DematServiceCheck = lazy(() => import('./l5-inst2').then((m) => ({ default: m.L5DematServiceCheck })))
const L5KycDoctor = lazy(() => import('./l5-inst2').then((m) => ({ default: m.L5KycDoctor })))
const L5AmlSimulator = lazy(() => import('./l5-inst2').then((m) => ({ default: m.L5AmlSimulator })))
const L5ProtectionLimits = lazy(() => import('./l5-inst2').then((m) => ({ default: m.L5ProtectionLimits })))
const L5ComplaintBuilder = lazy(() => import('./l5-inst2').then((m) => ({ default: m.L5ComplaintBuilder })))
const L5ConsumerCaseBuilder = lazy(() => import('./l5-inst2').then((m) => ({ default: m.L5ConsumerCaseBuilder })))
const L5ContractScanner = lazy(() => import('./l5-inst2').then((m) => ({ default: m.L5ContractScanner })))
const L5LoanAgreementAudit = lazy(() => import('./l5-inst2').then((m) => ({ default: m.L5LoanAgreementAudit })))
const L5PolicyReader = lazy(() => import('./l5-inst2').then((m) => ({ default: m.L5PolicyReader })))
const L5CardAgreementAudit = lazy(() => import('./l5-inst3').then((m) => ({ default: m.L5CardAgreementAudit })))
const L5BrokerAgreementAudit = lazy(() => import('./l5-inst3').then((m) => ({ default: m.L5BrokerAgreementAudit })))
const L5RentAgreementAudit = lazy(() => import('./l5-inst3').then((m) => ({ default: m.L5RentAgreementAudit })))
const L5HiddenCostHunt = lazy(() => import('./l5-inst3').then((m) => ({ default: m.L5HiddenCostHunt })))
const L5FeeNormaliser = lazy(() => import('./l5-inst3').then((m) => ({ default: m.L5FeeNormaliser })))
const L5PenaltyDispute = lazy(() => import('./l5-inst3').then((m) => ({ default: m.L5PenaltyDispute })))
const L5ClauseSpotter = lazy(() => import('./l5-inst3').then((m) => ({ default: m.L5ClauseSpotter })))
const L5RaiseNegotiation = lazy(() => import('./l5-inst3').then((m) => ({ default: m.L5RaiseNegotiation })))
const L5RentNegotiation = lazy(() => import('./l5-inst3').then((m) => ({ default: m.L5RentNegotiation })))
const L5LoanNegotiation = lazy(() => import('./l5-inst3').then((m) => ({ default: m.L5LoanNegotiation })))
const L5FreelanceRate = lazy(() => import('./l5-inst3').then((m) => ({ default: m.L5FreelanceRate })))
// Band four, batch 1: the estate, the family and the paperwork around both.
const L5EstatePlanner = lazy(() => import('./l5-estate').then((m) => ({ default: m.L5EstatePlanner })))
const L5NominationAudit = lazy(() => import('./l5-estate').then((m) => ({ default: m.L5NominationAudit })))
const L5BeneficiaryDesigner = lazy(() => import('./l5-estate').then((m) => ({ default: m.L5BeneficiaryDesigner })))
const L5WillBuilder = lazy(() => import('./l5-estate').then((m) => ({ default: m.L5WillBuilder })))
const L5InheritanceProcessor = lazy(() => import('./l5-estate').then((m) => ({ default: m.L5InheritanceProcessor })))
const L5SuccessionPlanner = lazy(() => import('./l5-estate').then((m) => ({ default: m.L5SuccessionPlanner })))
const L5JointHoldingChooser = lazy(() => import('./l5-estate').then((m) => ({ default: m.L5JointHoldingChooser })))
const L5FamilyFinanceSetup = lazy(() => import('./l5-estate').then((m) => ({ default: m.L5FamilyFinanceSetup })))
const L5MarriageFinancePlan = lazy(() => import('./l5-estate').then((m) => ({ default: m.L5MarriageFinancePlan })))
const L5ParentCareBudget = lazy(() => import('./l5-estate').then((m) => ({ default: m.L5ParentCareBudget })))

// Band four, batch 2: dependants, education, the purchases people make with a
// loan, and what to do when the money stops arriving.
const L5DependantPlanner = lazy(() => import('./l5-life').then((m) => ({ default: m.L5DependantPlanner })))
const L5EducationGoal = lazy(() => import('./l5-life').then((m) => ({ default: m.L5EducationGoal })))
const L5MajorPurchaseAnalyser = lazy(() => import('./l5-life').then((m) => ({ default: m.L5MajorPurchaseAnalyser })))
const L5HouseAffordability = lazy(() => import('./l5-life').then((m) => ({ default: m.L5HouseAffordability })))
const L5VehicleTco = lazy(() => import('./l5-life').then((m) => ({ default: m.L5VehicleTco })))
const L5EducationRoi = lazy(() => import('./l5-life').then((m) => ({ default: m.L5EducationRoi })))
const L5RentBuyModel = lazy(() => import('./l5-life').then((m) => ({ default: m.L5RentBuyModel })))
const L5NewVsUsed = lazy(() => import('./l5-life').then((m) => ({ default: m.L5NewVsUsed })))
const L5CashVsFinance = lazy(() => import('./l5-life').then((m) => ({ default: m.L5CashVsFinance })))
const L5CrisisDrill = lazy(() => import('./l5-life').then((m) => ({ default: m.L5CrisisDrill })))

// Band four, batch 3, and the first chapters of fraud & due diligence: income
// shocks, medical claims, market falls, debt, fraud, identity and the sellers
// who are not regulated at all.
const L5JobLossPlan = lazy(() => import('./l5-protect').then((m) => ({ default: m.L5JobLossPlan })))
const L5MedicalClaimRun = lazy(() => import('./l5-protect').then((m) => ({ default: m.L5MedicalClaimRun })))
const L5CrashSimulator = lazy(() => import('./l5-protect').then((m) => ({ default: m.L5CrashSimulator })))
const L5RecessionAdjuster = lazy(() => import('./l5-protect').then((m) => ({ default: m.L5RecessionAdjuster })))
const L5DebtTriage = lazy(() => import('./l5-protect').then((m) => ({ default: m.L5DebtTriage })))
const L5FraudResponseDrill = lazy(() => import('./l5-protect').then((m) => ({ default: m.L5FraudResponseDrill })))
const L5AccountRecovery = lazy(() => import('./l5-protect').then((m) => ({ default: m.L5AccountRecovery })))
const L5IdentityRepair = lazy(() => import('./l5-protect').then((m) => ({ default: m.L5IdentityRepair })))
const L5ScamInbox = lazy(() => import('./l5-protect').then((m) => ({ default: m.L5ScamInbox })))
const L5GuruAudit = lazy(() => import('./l5-protect').then((m) => ({ default: m.L5GuruAudit })))

// Band three, batch 4 / fraud & due diligence: spotting the con, testing the
// claim, and verifying before any money moves.
const L5PumpDumpDetective = lazy(() => import('./l5-fraud').then((m) => ({ default: m.L5PumpDumpDetective })))
const L5VerifyCall = lazy(() => import('./l5-fraud').then((m) => ({ default: m.L5VerifyCall })))
const L5PlatformVerifier = lazy(() => import('./l5-fraud').then((m) => ({ default: m.L5PlatformVerifier })))
const L5JobScamScreener = lazy(() => import('./l5-fraud').then((m) => ({ default: m.L5JobScamScreener })))
const L5CryptoClaimCheck = lazy(() => import('./l5-fraud').then((m) => ({ default: m.L5CryptoClaimCheck })))
const L5SocialEngineeringDefence = lazy(() => import('./l5-fraud').then((m) => ({ default: m.L5SocialEngineeringDefence })))
const L5DiligenceWorksheet = lazy(() => import('./l5-fraud').then((m) => ({ default: m.L5DiligenceWorksheet })))
const L5ProductComparator = lazy(() => import('./l5-fraud').then((m) => ({ default: m.L5ProductComparator })))
const L5ReturnSourceAnalyser = lazy(() => import('./l5-fraud').then((m) => ({ default: m.L5ReturnSourceAnalyser })))
const L5RiskRegister = lazy(() => import('./l5-fraud').then((m) => ({ default: m.L5RiskRegister })))
const L5LiquidityStress = lazy(() => import('./l5-fraud').then((m) => ({ default: m.L5LiquidityStress })))
const L5FeeAudit = lazy(() => import('./l5-fraud').then((m) => ({ default: m.L5FeeAudit })))
const L5VerifyEntity = lazy(() => import('./l5-fraud').then((m) => ({ default: m.L5VerifyEntity })))

// Band five / AI tools (l5-114 to l5-122): research, budgeting, spreadsheets,
// documents, learning, the failure modes, and the credentials that never move.
const L5AiAssistants = lazy(() => import('./l5-ai').then((m) => ({ default: m.L5AiAssistants })))
const L5AiBudgetReview = lazy(() => import('./l5-ai').then((m) => ({ default: m.L5AiBudgetReview })))
const L5AiFormulaChecker = lazy(() => import('./l5-ai').then((m) => ({ default: m.L5AiFormulaChecker })))
const L5AiPolicyReader = lazy(() => import('./l5-ai').then((m) => ({ default: m.L5AiPolicyReader })))
const L5AiTutorAudit = lazy(() => import('./l5-ai').then((m) => ({ default: m.L5AiTutorAudit })))
const L5AiStressTest = lazy(() => import('./l5-ai').then((m) => ({ default: m.L5AiStressTest })))
const L5AiClaimVerifier = lazy(() => import('./l5-ai').then((m) => ({ default: m.L5AiClaimVerifier })))
const L5AiPrivacyAudit = lazy(() => import('./l5-ai').then((m) => ({ default: m.L5AiPrivacyAudit })))
const L5CredentialDefence = lazy(() => import('./l5-ai').then((m) => ({ default: m.L5CredentialDefence })))

// Band six, batch 1: the operations a small formula engine does not evaluate.
const L5LookupBuilder = lazy(() => import('./l5-sheet').then((m) => ({ default: m.L5LookupBuilder })))
const L5FilterBuilder = lazy(() => import('./l5-sheet').then((m) => ({ default: m.L5FilterBuilder })))
const L5ChartBuilder = lazy(() => import('./l5-sheet').then((m) => ({ default: m.L5ChartBuilder })))
const L5PivotBuilder = lazy(() => import('./l5-sheet').then((m) => ({ default: m.L5PivotBuilder })))
const L5CalculatorSanity = lazy(() => import('./l5-calc').then((m) => ({ default: m.L5CalculatorSanity })))
const L5CompoundModel = lazy(() => import('./l5-calc').then((m) => ({ default: m.L5CompoundModel })))
const L5EmiModel = lazy(() => import('./l5-calc').then((m) => ({ default: m.L5EmiModel })))
const L5SipModel = lazy(() => import('./l5-calc').then((m) => ({ default: m.L5SipModel })))
const L5InflationModel = lazy(() => import('./l5-calc').then((m) => ({ default: m.L5InflationModel })))
const L5RetirementModel = lazy(() => import('./l5-calc').then((m) => ({ default: m.L5RetirementModel })))
const L5CagrModel = lazy(() => import('./l5-calc').then((m) => ({ default: m.L5CagrModel })))
const L5NetworthModel = lazy(() => import('./l5-calc').then((m) => ({ default: m.L5NetworthModel })))
const L5DebtPayoffModel = lazy(() => import('./l5-calc').then((m) => ({ default: m.L5DebtPayoffModel })))
const L5RealReturnModel = lazy(() => import('./l5-calc').then((m) => ({ default: m.L5RealReturnModel })))
const L5ScenarioPlanner = lazy(() => import('./l5-model').then((m) => ({ default: m.L5ScenarioPlanner })))
const L5SensitivityModel = lazy(() => import('./l5-model').then((m) => ({ default: m.L5SensitivityModel })))
const L5BestWorstModel = lazy(() => import('./l5-model').then((m) => ({ default: m.L5BestWorstModel })))
const L5StressTestModel = lazy(() => import('./l5-model').then((m) => ({ default: m.L5StressTestModel })))
const L5DocumentInventory = lazy(() => import('./l5-security').then((m) => ({ default: m.L5DocumentInventory })))
const L5SecureStorageSetup = lazy(() => import('./l5-security').then((m) => ({ default: m.L5SecureStorageSetup })))
const L5BackupPlanner = lazy(() => import('./l5-security').then((m) => ({ default: m.L5BackupPlanner })))
const L5SecurityHardening = lazy(() => import('./l5-security').then((m) => ({ default: m.L5SecurityHardening })))
const L5AutomationDesigner = lazy(() => import('./l5-security').then((m) => ({ default: m.L5AutomationDesigner })))
const L5EmergencySeparation = lazy(() => import('./l5-security').then((m) => ({ default: m.L5EmergencySeparation })))

/** Placeholder shown while a sim chunk is in flight. */
function SimLoading() {
  return (
    <div className="flex h-40 items-center justify-center rounded-xl border border-white/10 bg-ink-900/40">
      <span className="flex items-center gap-2 text-sm text-ink-400">
        <span className="h-2 w-2 animate-ping rounded-full bg-brand-400" />
        Loading the lab…
      </span>
    </div>
  )
}

/**
 * Context handed to every lab. Most labs ignore it; the spreadsheet lab uses it
 * to pick the dataset and assignment that belong to the chapter it sits in.
 */
export type SimProps = { chapterId?: string }

type SimMeta = { title: string; blurb: string; C: (props: SimProps) => React.ReactElement }

export const SIMS: Record<SimName, SimMeta> = {
  compound: {
    title: 'Compound interest lab',
    blurb: 'Move the sliders and watch money grow on its own.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <CompoundLab />
      </Suspense>
    ),
  },
  budget: {
    title: 'Build a monthly budget',
    blurb: 'Try to spend, save and stay out of the red.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <BudgetBuilder />
      </Suspense>
    ),
  },
  networth: {
    title: 'Net worth builder',
    blurb: 'Add what you own and owe. Watch net worth move.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <NetWorthLab />
      </Suspense>
    ),
  },
  market: {
    title: 'Market simulator',
    blurb: 'Run a bull, bear or crash and compare SIP vs lump sum.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <MarketLab />
      </Suspense>
    ),
  },
  sheet: {
    title: 'Spreadsheet lab',
    blurb: 'A working sheet, with this chapter\u2019s own data and assignment.',
    C: (props) => (
      <Suspense fallback={<SimLoading />}>
        <SheetLab key={props.chapterId ?? 'sandbox'} chapterId={props.chapterId} />
      </Suspense>
    ),
  },
  rupee10: {
    title: 'The ₹10 challenge',
    blurb: 'Seven days. Ten rupees. Make the best calls you can.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <RupeeTen />
      </Suspense>
    ),
  },
  'scam-spotter': {
    title: 'Scam spotter',
    blurb: 'Read real-style messages and hunt the red flags.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <ScamSpotter />
      </Suspense>
    ),
  },
  emi: {
    title: 'EMI and total cost lab',
    blurb: 'See the EMI, and how much of it never becomes yours.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <EmiLab />
      </Suspense>
    ),
  },
  'salary-slip': {
    title: 'Salary structure builder',
    blurb: 'Turn an advertised CTC into the salary that reaches your bank.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <SalarySlipLab />
      </Suspense>
    ),
  },
  minpayment: {
    title: 'The minimum payment trap',
    blurb: 'Why paying only the minimum keeps the debt alive.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <MinPaymentLab />
      </Suspense>
    ),
  },
  cover: {
    title: 'Health cover adequacy',
    blurb: 'Check whether your cover matches your income and family.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <CoverLab />
      </Suspense>
    ),
  },
  portfolio: {
    title: 'Asset allocation lab',
    blurb: 'Build a mix and see its return, its swing, and what a crash would cost you.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <PortfolioLab />
      </Suspense>
    ),
  },
  bond: {
    title: 'Bond pricing lab',
    blurb: 'Coupon, maturity and yield — and why bond prices fall when rates rise.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <BondLab />
      </Suspense>
    ),
  },
  realreturn: {
    title: 'Real return and inflation',
    blurb: 'Strip inflation out of any return and see what your money really buys.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <RealReturnLab />
      </Suspense>
    ),
  },
  currency: {
    title: 'Currency and the rupee',
    blurb: 'What depreciation gives you abroad, and what it quietly costs you at home.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <CurrencyLab />
      </Suspense>
    ),
  },
  valuation: {
    title: 'Stock valuation lab',
    blurb: 'Type a company&apos;s numbers and watch EPS, P/E, ROE and debt update live.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <ValuationLab />
      </Suspense>
    ),
  },
  feedrag: {
    title: 'The drag of fund fees',
    blurb: 'Identical market returns through very different expense ratios.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <FeeDragLab />
      </Suspense>
    ),
  },
  cycle: {
    title: 'Market cycle lab',
    blurb: 'The same asset, held the same period, three very different outcomes.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <CycleLab />
      </Suspense>
    ),
  },
  tax: {
    title: 'Income tax regime lab',
    blurb: 'Edge your way through slabs, rebates and TDS to see what actually lands in your account.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <TaxLab />
      </Suspense>
    ),
  },
  'options-payoff': {
    title: 'Options payoff lab',
    blurb: 'Trace the breakeven and the capped upside/uncapped downside of calls and puts.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <OptionsPayoffLab />
      </Suspense>
    ),
  },
  'l5-first-salary-split': {
    title: 'First salary allocation lab',
    blurb: 'Allocate a real take-home figure and see what your split does to the buffer, the saving rate and the month.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5FirstSalarySplit />
      </Suspense>
    ),
  },
  'l5-negotiation-rounds': {
    title: 'Three-round negotiation lab',
    blurb: 'Negotiate inside a real band, with four kinds of justification that move the number differently.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5NegotiationRounds />
      </Suspense>
    ),
  },
  'l5-offer-compare': {
    title: 'Offer comparison lab',
    blurb: 'Price two offers over three years and find which assumption decides the winner.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5OfferCompare />
      </Suspense>
    ),
  },
  'l5-ctc-decompose': {
    title: 'CTC to take-home lab',
    blurb: 'Rebuild any CTC as gross, each statutory deduction, tax withheld and the monthly bank credit.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5CtcDecompose />
      </Suspense>
    ),
  },
  'l5-benefit-valuator': {
    title: 'Benefits valuation lab',
    blurb: 'Price a benefits line, then ask whether the same rupees would be better as cash.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5BenefitEvaluator />
      </Suspense>
    ),
  },
  'l5-pf-lifecycle': {
    title: 'Provident fund lifecycle lab',
    blurb: 'Run one UAN across a job change and see what transferring, withdrawing or abandoning costs.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5PfLifecycle />
      </Suspense>
    ),
  },
  'l5-regime-picker': {
    title: 'Tax regime picker',
    blurb: 'Compute both regimes from your own rent, 80C and home-loan interest, and find the crossover.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5RegimePicker />
      </Suspense>
    ),
  },
  'l5-monthly-routine': {
    title: 'Monthly routine lab',
    blurb: 'Place the recurring decisions of a month on dates and find the orderings that break.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5MonthlyRoutine />
      </Suspense>
    ),
  },
  'l5-emergency-sizing': {
    title: 'Emergency fund sizing lab',
    blurb: 'Size a buffer from obligations, income risk and dependants — not from a fixed six-month rule.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5EmergencySizing />
      </Suspense>
    ),
  },
  'l5-sinking-planner': {
    title: 'Sinking fund planner',
    blurb: 'Break annual bills into monthly transfers and see which months are overloaded.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5SinkingPlanner />
      </Suspense>
    ),
  },
  'l5-budget-system-picker': {
    title: 'Budgeting system picker',
    blurb: 'Three questions, three systems — and an honest note on what the winner cannot do.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5BudgetSystemPicker />
      </Suspense>
    ),
  },
  'l5-zero-based-builder': {
    title: 'Zero-based budget builder',
    blurb: 'Assign every rupee to a named job and check that the plan actually reaches zero.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5ZeroBasedBuilder />
      </Suspense>
    ),
  },
  'l5-ratio-stress-test': {
    title: '50/30/20 stress test',
    blurb: 'Put the percentage framework against a real city rent bill and see when it stops working.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5RatioStressTest />
      </Suspense>
    ),
  },
  'l5-cashflow-timing': {
    title: 'Cash-flow timing lab',
    blurb: 'Move dates instead of amounts and find the day a solvent month bounces a payment.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5CashflowTiming />
      </Suspense>
    ),
  },
  'l5-automation-blueprint': {
    title: 'Automation blueprint lab',
    blurb: 'Pick a rail for each transfer, then run a failure drill with the salary arriving late.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AutomationBlueprint />
      </Suspense>
    ),
  },
  'l5-sip-automation': {
    title: 'Automated investment lab',
    blurb: 'Run a step-up instalment plan and price what a missed instalment actually costs.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5SipAutomation />
      </Suspense>
    ),
  },
  'l5-bill-automation-board': {
    title: 'Bill automation board',
    blurb: 'Decide what to automate and what to review, and audit the subscriptions you forgot.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5BillAutomationBoard />
      </Suspense>
    ),
  },
  'l5-alert-tuning': {
    title: 'Alert tuning lab',
    blurb: 'Tune one threshold against a month of debits and see what it catches and what it misses.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AlertTuning />
      </Suspense>
    ),
  },
  'l5-dashboard-designer': {
    title: 'Dashboard designer',
    blurb: 'Choose up to six numbers and find out which of them would change a decision.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5DashboardDesigner />
      </Suspense>
    ),
  },
  'l5-portfolio-architect': {
    title: 'Portfolio architecture lab',
    blurb: 'Build from purpose and horizon, stress the mix, and write the policy that goes with it.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5PortfolioArchitect />
      </Suspense>
    ),
  },
  'l5-allocation-designer': {
    title: 'Asset allocation designer',
    blurb: 'Set target weights, watch them drift, and add a glide path towards the date.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AllocationDesigner />
      </Suspense>
    ),
  },
  'l5-overlap-checker': {
    title: 'Overlap and concentration lab',
    blurb: 'Open every wrapper and see what your largest sector and company exposures really are.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5OverlapChecker />
      </Suspense>
    ),
  },
  'l5-rebalance-trigger': {
    title: 'Rebalancing rule lab',
    blurb: 'Compare a calendar rule with a threshold band, and price the tax each one creates.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5RebalanceTrigger />
      </Suspense>
    ),
  },
  'l5-goal-mapper': {
    title: 'Goal mapping lab',
    blurb: 'Give every goal a date, a mix and a contribution, and find the shortfall that remains.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5GoalMapper />
      </Suspense>
    ),
  },
  'l5-reit-analyser': {
    title: 'REIT analysis lab',
    blurb: 'Turn rent into a distribution, split it by tax treatment, and check occupancy and leverage.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5ReitAnalyser />
      </Suspense>
    ),
  },
  'l5-invit-analyser': {
    title: 'InvIT analysis lab',
    blurb: 'Weigh a concession cash flow against its end date, its counterparty and its leverage.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5InvitAnalyser />
      </Suspense>
    ),
  },
  'l5-global-diversifier': {
    title: 'International investing lab',
    blurb: 'Price a remittance after tax collected at source, and see the currency bet inside the return.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5GlobalDiversifier />
      </Suspense>
    ),
  },
  'l5-etf-cost-check': {
    title: 'ETF versus index fund lab',
    blurb: 'Cross the spread, the premium and the fees, and find the holding period that decides the winner.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5EtfCostCheck />
      </Suspense>
    ),
  },
  'l5-pe-waterfall': {
    title: 'Private equity waterfall lab',
    blurb: 'Draw down a commitment, pay both layers of fees, and split the carry.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5PeWaterfall />
      </Suspense>
    ),
  },
  'l5-vc-portfolio': {
    title: 'Venture portfolio lab',
    blurb: 'Size power-law bets, and watch the average and the middle disagree.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5VcPortfolio />
      </Suspense>
    ),
  },
  'l5-liquidity-map': {
    title: 'Liquidity map lab',
    blurb: 'Test which holdings are actually spendable when income stops.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5LiquidityMap />
      </Suspense>
    ),
  },
  'l5-total-cost-of-ownership': {
    title: 'Total cost of ownership lab',
    blurb: 'Add every layer of cost on one holding and convert it to rupees a year.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5TotalCostOfOwnership />
      </Suspense>
    ),
  },
  'l5-tax-planner': {
    title: 'Capital gains planning lab',
    blurb: 'Set off a loss, price a holding period, and plan the tax year.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5TaxPlanner />
      </Suspense>
    ),
  },
  'l5-retirement-projector': {
    title: 'Retirement projector',
    blurb: 'Replace a salary with streams that keep paying as prices rise.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5RetirementProjector />
      </Suspense>
    ),
  },
  'l5-independence-number': {
    title: 'Independence number lab',
    blurb: 'Turn a multiple of your spending into a target and a date.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5IndependenceNumber />
      </Suspense>
    ),
  },
  'l5-fire-stress-test': {
    title: 'FIRE stress test',
    blurb: 'Break a plan with a bad first decade, then repair it.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5FireStressTest />
      </Suspense>
    ),
  },
  'l5-savings-rate-lab': {
    title: 'Savings rate lab',
    blurb: 'Measure the rate honestly and see it move the funding date.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5SavingsRateLab />
      </Suspense>
    ),
  },
  'l5-passive-income-audit': {
    title: 'Passive income audit',
    blurb: 'Score each stream on effort, concentration and its tax head.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5PassiveIncomeAudit />
      </Suspense>
    ),
  },
  'l5-alternatives-screener': {
    title: 'Alternatives screener',
    blurb: 'Test access, lock-in, valuation and fee load before you look at a single return figure.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AlternativesScreener />
      </Suspense>
    ),
  },
  'l5-jurisdiction-finder': {
    title: 'Regulator finder',
    blurb: 'Name the product, name its owner, and get the register, the route and the flag to watch.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5JurisdictionFinder />
      </Suspense>
    ),
  },
  'l5-rbi-checklist': {
    title: 'Depositor checklist',
    blurb: 'Spread deposits against the insurance limit, and test the payment and complaint rules.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5RbiChecklist />
      </Suspense>
    ),
  },
  'l5-sebi-verify': {
    title: 'Intermediary verification lab',
    blurb: 'Check a market intermediary against its register, and score the claims you have heard.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5SebiVerify />
      </Suspense>
    ),
  },
  'l5-insurer-verify': {
    title: 'Insurer and claim verification lab',
    blurb: 'Verify the seller, then test the claim timelines, the free look and the ombudsman route.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5InsurerVerify />
      </Suspense>
    ),
  },
  'l5-pension-setup': {
    title: 'Pension account lab',
    blurb: 'Fund a pension account, allocate it, and price the lump sum and annuity at the exit.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5PensionSetup />
      </Suspense>
    ),
  },
  'l5-bank-picker': {
    title: 'Bank comparison lab',
    blurb: 'Weigh the insurance limit, the free allowances and the penalties across four banks.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5BankPicker />
      </Suspense>
    ),
  },
  'l5-nbfc-check': {
    title: 'Non-bank lender check',
    blurb: 'Cost a non-bank loan against a bank loan, with the fee and the register check in place.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5NbfcCheck />
      </Suspense>
    ),
  },
  'l5-insurer-scorecard': {
    title: 'Insurer scorecard',
    blurb: 'Score insurers on solvency, claims, complaints and network rather than on advertising.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5InsurerScorecard />
      </Suspense>
    ),
  },
  'l5-amc-diligence': {
    title: 'Asset manager diligence lab',
    blurb: 'Read the manager\u2019s revenue, the fee drag and the record that travels with the scheme.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AmcDiligence />
      </Suspense>
    ),
  },
  'l5-exchange-role': {
    title: 'Exchange settlement lab',
    blurb: 'See what settlement guarantees, what the protection fund covers, and what is yours alone.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5ExchangeRole />
      </Suspense>
    ),
  },
  'l5-broker-compare': {
    title: 'Broker cost comparison',
    blurb: 'Price a year of trading line by line, and see which charges no broker can change.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5BrokerCompare />
      </Suspense>
    ),
  },
  'l5-demat-service-check': {
    title: 'Demat account audit',
    blurb: 'Price the annual charges, test a pledge, and check what a transmission would need.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5DematServiceCheck />
      </Suspense>
    ),
  },
  'l5-kyc-doctor': {
    title: 'KYC diagnosis lab',
    blurb: 'Find which register holds the record, whether a refresh is due, and what gives a fraud call away.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5KycDoctor />
      </Suspense>
    ),
  },
  'l5-aml-simulator': {
    title: 'Monitoring simulator',
    blurb: 'Run a month of transactions through the thresholds and see what resolves a flag.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AmlSimulator />
      </Suspense>
    ),
  },
  'l5-protection-limits': {
    title: 'Protection limits lab',
    blurb: 'Match a loss to the safety net that answers for it, and find the ceiling.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5ProtectionLimits />
      </Suspense>
    ),
  },
  'l5-complaint-builder': {
    title: 'Complaint escalation builder',
    blurb: 'Assemble the evidence, choose the rung, and see whether the window is open.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5ComplaintBuilder />
      </Suspense>
    ),
  },
  'l5-consumer-case-builder': {
    title: 'Consumer case builder',
    blurb: 'Pick the commission by value, check the limitation period, and list the relief.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5ConsumerCaseBuilder />
      </Suspense>
    ),
  },
  'l5-contract-scanner': {
    title: 'Contract clause scanner',
    blurb: 'Sort the eight clauses that move cost, risk and control, and mark what to negotiate.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5ContractScanner />
      </Suspense>
    ),
  },
  'l5-loan-agreement-audit': {
    title: 'Loan agreement audit',
    blurb: 'Check prepayment, penalty, reset and bundling clauses against the rules that govern them.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5LoanAgreementAudit />
      </Suspense>
    ),
  },
  'l5-policy-reader': {
    title: 'Policy wording reader',
    blurb: 'Reduce a claim by room limits, co-payment and waiting periods, then read the clocks.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5PolicyReader />
      </Suspense>
    ),
  },
  'l5-card-agreement-audit': {
    title: 'Cardholder terms audit',
    blurb: 'Price the interest-free period, the minimum due, a cash advance and a fraud liability window.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5CardAgreementAudit />
      </Suspense>
    ),
  },
  'l5-broker-agreement-audit': {
    title: 'Broking agreement audit',
    blurb: 'Weigh the authorities you grant a member against the protections that come with them.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5BrokerAgreementAudit />
      </Suspense>
    ),
  },
  'l5-rent-agreement-audit': {
    title: 'Tenancy terms audit',
    blurb: 'Deposit, escalation, lock-in and notice, priced as a whole before the rent is discussed.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5RentAgreementAudit />
      </Suspense>
    ),
  },
  'l5-hidden-cost-hunt': {
    title: 'Hidden cost hunt',
    blurb: 'Reconstruct the true cost of a product from the five layers under its headline price.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5HiddenCostHunt />
      </Suspense>
    ),
  },
  'l5-fee-normaliser': {
    title: 'Fee normaliser',
    blurb: 'Convert every one-off, annual and percentage fee into a single annual number.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5FeeNormaliser />
      </Suspense>
    ),
  },
  'l5-penalty-dispute': {
    title: 'Penalty and dispute clock',
    blurb: 'Separate the lawful part of a penalty from the part worth disputing, by product and by day.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5PenaltyDispute />
      </Suspense>
    ),
  },
  'l5-clause-spotter': {
    title: 'Clause spotter',
    blurb: 'Mark the clauses that move money, then price the asymmetry they create.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5ClauseSpotter />
      </Suspense>
    ),
  },
  'l5-raise-negotiation': {
    title: 'Raise negotiation',
    blurb: 'Fixed pay, variable pay, tax and the written agreement, in one frame.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5RaiseNegotiation />
      </Suspense>
    ),
  },
  'l5-rent-negotiation': {
    title: 'Rent negotiation',
    blurb: 'Trade deposit months, escalation and brokerage against the whole occupancy cost.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5RentNegotiation />
      </Suspense>
    ),
  },
  'l5-loan-negotiation': {
    title: 'Loan negotiation',
    blurb: 'Rank rate, tenure, fees and prepayment by the rupees each one actually saves.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5LoanNegotiation />
      </Suspense>
    ),
  },
  'l5-freelance-rate': {
    title: 'Freelance rate builder',
    blurb: 'Build a rate from costs, billable hours and tax, then protect it with scope and payment terms.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5FreelanceRate />
      </Suspense>
    ),
  },
  'l5-estate-planner': {
    title: 'Estate planning lab',
    blurb: 'Sort an estate by the route each slice actually takes: nomination, will, or the default rule.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5EstatePlanner />
      </Suspense>
    ),
  },
  'l5-nomination-audit': {
    title: 'Nomination audit',
    blurb: 'Audit every place money sits and see what a missing nomination costs the family.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5NominationAudit />
      </Suspense>
    ),
  },
  'l5-beneficiary-designer': {
    title: 'Beneficiary designer',
    blurb: 'Compare the shares a will gives with the shares the default rule would give instead.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5BeneficiaryDesigner />
      </Suspense>
    ),
  },
  'l5-will-builder': {
    title: 'Will builder',
    blurb: 'Assemble a valid will part by part and find the piece that is missing.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5WillBuilder />
      </Suspense>
    ),
  },
  'l5-inheritance-processor': {
    title: 'Inheritance processor',
    blurb: 'Work an inheritance in order: liabilities, titles, then the decision to hold or sell.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5InheritanceProcessor />
      </Suspense>
    ),
  },
  'l5-succession-planner': {
    title: 'Succession planner',
    blurb: 'Move ownership, control and funding across a handover, and see the gap that remains.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5SuccessionPlanner />
      </Suspense>
    ),
  },
  'l5-joint-holding-chooser': {
    title: 'Joint holding chooser',
    blurb: 'Pick the wording on an account and see what it does, and does not do, on a death.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5JointHoldingChooser />
      </Suspense>
    ),
  },
  'l5-family-finance-setup': {
    title: 'Household money setup',
    blurb: 'Set who pays what, who sees what and what happens when one income stops.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5FamilyFinanceSetup />
      </Suspense>
    ),
  },
  'l5-marriage-finance-plan': {
    title: 'Marriage finance planner',
    blurb: 'Separate what stays individual from what marriage actually changes by default.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5MarriageFinancePlan />
      </Suspense>
    ),
  },
  'l5-parent-care-budget': {
    title: 'Parent support budget',
    blurb: 'Layer cover, monthly support, medicines and a buffer into one annual number.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5ParentCareBudget />
      </Suspense>
    ),
  },
  'l5-dependant-planner': {
    title: 'Dependant planner',
    blurb: 'Add up who depends on your income, what supporting them costs, and the cover that replaces it.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5DependantPlanner />
      </Suspense>
    ),
  },
  'l5-education-goal': {
    title: 'Education goal planner',
    blurb: 'Price a course at the day of admission, then find the monthly amount that gets there.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5EducationGoal />
      </Suspense>
    ),
  },
  'l5-major-purchase-analyser': {
    title: 'Major purchase analyser',
    blurb: 'Turn a price tag into the total cost of owning it, month by month and rupee by rupee.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5MajorPurchaseAnalyser />
      </Suspense>
    ),
  },
  'l5-house-affordability': {
    title: 'House affordability lab',
    blurb: 'Work out the cash a house actually needs on day one, and the EMI that follows it.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5HouseAffordability />
      </Suspense>
    ),
  },
  'l5-vehicle-tco': {
    title: 'Vehicle cost of ownership',
    blurb: 'Five years of a vehicle, from the on-road price to the cost of every kilometre.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5VehicleTco />
      </Suspense>
    ),
  },
  'l5-education-roi': {
    title: 'Education return lab',
    blurb: 'Judge a degree on its full cost, the payback period and the premium it actually buys.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5EducationRoi />
      </Suspense>
    ),
  },
  'l5-rent-buy-model': {
    title: 'Rent versus buy model',
    blurb: 'Put rent-and-invest against buy-and-repay, and find the year the two cross over.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5RentBuyModel />
      </Suspense>
    ),
  },
  'l5-new-vs-used': {
    title: 'New versus used lab',
    blurb: 'Compare the two depreciation curves and the five-year cost of each choice.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5NewVsUsed />
      </Suspense>
    ),
  },
  'l5-cash-vs-finance': {
    title: 'Cash versus financing lab',
    blurb: 'Compare the loan rate with what the cash earns after tax, and check the reserve survives.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5CashVsFinance />
      </Suspense>
    ),
  },
  'l5-crisis-drill': {
    title: 'Crisis drill',
    blurb: 'Run a financial crisis in order, from the runway to what you sell last.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5CrisisDrill />
      </Suspense>
    ),
  },
  'l5-job-loss-plan': {
    title: 'Job loss runway plan',
    blurb: 'Stack every source of time you can reach, then stage the spending until the next income arrives.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5JobLossPlan />
      </Suspense>
    ),
  },
  'l5-medical-claim-run': {
    title: 'Medical claim run',
    blurb: 'Walk a hospitalisation through the cashless route and the reimbursement route, and see what you pay.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5MedicalClaimRun />
      </Suspense>
    ),
  },
  'l5-crash-simulator': {
    title: 'Crash plan simulator',
    blurb: 'Test what the written plan does at each stage of a fall, before the fall happens.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5CrashSimulator />
      </Suspense>
    ),
  },
  'l5-recession-adjuster': {
    title: 'Recession adjuster',
    blurb: 'Measure fixed costs against income risk, then make the defensive adjustment in order.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5RecessionAdjuster />
      </Suspense>
    ),
  },
  'l5-debt-triage': {
    title: 'Debt triage',
    blurb: 'Sort several debts by rate and by consequence, and see what the order is worth in interest.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5DebtTriage />
      </Suspense>
    ),
  },
  'l5-fraud-response-drill': {
    title: 'Fraud response drill',
    blurb: 'Work the golden hour, and see which rung of the liability ladder your timing puts you on.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5FraudResponseDrill />
      </Suspense>
    ),
  },
  'l5-account-recovery': {
    title: 'Account recovery lab',
    blurb: 'Contain a compromised account, then audit every service that survives a new card.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AccountRecovery />
      </Suspense>
    ),
  },
  'l5-identity-repair': {
    title: 'Identity repair lab',
    blurb: 'Read a credit report that has something on it, and work the dispute in the order that fixes it.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5IdentityRepair />
      </Suspense>
    ),
  },
  'l5-scam-inbox': {
    title: 'Scam inbox',
    blurb: 'Judge six offers on who regulates them, where the money goes and what the hurry is.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5ScamInbox />
      </Suspense>
    ),
  },
  'l5-guru-audit': {
    title: 'Guru audit',
    blurb: 'Score a teacher against a promoter on registration, disclosure, track record and incentive.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5GuruAudit />
      </Suspense>
    ),
  },
  // Level 5 labs — band four, batch 4: fraud & due diligence (l5-101 to l5-113).
  'l5-pump-dump-detective': {
    title: 'Pump-and-dump detective',
    blurb: 'Read a thin float, a loud climb and the tip-cascade, and decide when to stay out and when to exit.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5PumpDumpDetective />
      </Suspense>
    ),
  },
  'l5-verify-call': {
    title: 'Verification call',
    blurb: 'Work a distressed video call through the anomalies and the callback rule before any money moves.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5VerifyCall />
      </Suspense>
    ),
  },
  'l5-platform-verifier': {
    title: 'Platform verifier',
    blurb: 'Test a trading app by trying to withdraw, and read the funnel behind the friendly dashboard.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5PlatformVerifier />
      </Suspense>
    ),
  },
  'l5-job-scam-screener': {
    title: 'Job-scam screener',
    blurb: 'Screen an offer against the five tells, from a registration fee to equipment bought on your own card.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5JobScamScreener />
      </Suspense>
    ),
  },
  'l5-crypto-claim-check': {
    title: 'Crypto claim check',
    blurb: 'Judge a guaranteed daily return by custody, withdrawal evidence and the exit that is actually available.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5CryptoClaimCheck />
      </Suspense>
    ),
  },
  'l5-social-engineering-defence': {
    title: 'Social-engineering defence',
    blurb: 'Break authority, urgency and secrecy with a scripted response, and see which one holds.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5SocialEngineeringDefence />
      </Suspense>
    ),
  },
  'l5-diligence-worksheet': {
    title: 'Diligence worksheet',
    blurb: 'Run a standard four-step pass on a product or intermediary before committing money.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5DiligenceWorksheet />
      </Suspense>
    ),
  },
  'l5-product-comparator': {
    title: 'Product comparator',
    blurb: 'Compare two products on return source, risk, liquidity, cost and tax rather than on the headline yield.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5ProductComparator />
      </Suspense>
    ),
  },
  'l5-return-source-analyser': {
    title: 'Return source analyser',
    blurb: 'Name where a promised return actually comes from, then decide whether the story holds.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5ReturnSourceAnalyser />
      </Suspense>
    ),
  },
  'l5-risk-register': {
    title: 'Risk register',
    blurb: 'Break a decision into market, credit, liquidity, concentration, operational and conduct risk, and rank them.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5RiskRegister />
      </Suspense>
    ),
  },
  'l5-liquidity-stress': {
    title: 'Liquidity stress test',
    blurb: 'Price the time-to-cash and the stressed discount of each holding before you need the money.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5LiquidityStress />
      </Suspense>
    ),
  },
  'l5-fee-audit': {
    title: 'Fee audit',
    blurb: 'Total the layers of cost over a holding period and decide what each fee is actually buying.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5FeeAudit />
      </Suspense>
    ),
  },
  'l5-verify-entity': {
    title: 'Verification desk',
    blurb: 'Check an entity on the regulator\u2019s own register and the warn lists before any money moves.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5VerifyEntity />
      </Suspense>
    ),
  },
  'l5-ai-assistants': {
    title: 'Task router',
    blurb: 'Route nine money tasks to the assistant, to a checked hand-off, or to yourself.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AiAssistants />
      </Suspense>
    ),
  },
  'l5-ai-budget-review': {
    title: 'Budget review lab',
    blurb: 'Redact what should never be pasted, then correct an AI-categorised month and reconcile it.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AiBudgetReview />
      </Suspense>
    ),
  },
  'l5-ai-formula-checker': {
    title: 'Formula checker',
    blurb: 'Diagnose three AI-written formulas from their symptoms, then fix the reference that broke them.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AiFormulaChecker />
      </Suspense>
    ),
  },
  'l5-ai-policy-reader': {
    title: 'Policy summary checker',
    blurb: 'Check five summary claims against the clauses they cite, and remove the one with no support.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AiPolicyReader />
      </Suspense>
    ),
  },
  'l5-ai-tutor-audit': {
    title: 'Tutor audit',
    blurb: 'Separate a durable concept from a stale rule, and decide what has to go to the regulator.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AiTutorAudit />
      </Suspense>
    ),
  },
  'l5-ai-stress-test': {
    title: 'AI failure-mode stress test',
    blurb: 'Name the failure behind six fluent outputs and match it to the check that catches it.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AiStressTest />
      </Suspense>
    ),
  },
  'l5-ai-claim-verifier': {
    title: 'Claim verifier',
    blurb: 'Trace five citations to their sources and mark each claim supported or unsupported.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AiClaimVerifier />
      </Suspense>
    ),
  },
  'l5-ai-privacy-audit': {
    title: 'Prompt privacy audit',
    blurb: 'Strip the identifiers from a prompt without removing the fields the question needs.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AiPrivacyAudit />
      </Suspense>
    ),
  },
  'l5-credential-defence': {
    title: 'Credential defence',
    blurb: 'Answer six requests for OTPs, PINs and card details without handing over a key.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5CredentialDefence />
      </Suspense>
    ),
  },
  'l5-lookup-builder': {
    title: 'Lookup builder',
    blurb: 'Resolve a folio code across columns, and decide what a missing key should return.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5LookupBuilder />
      </Suspense>
    ),
  },
  'l5-filter-builder': {
    title: 'Filter builder',
    blurb: 'Write one condition, watch which rows pass, and see why a spill needs empty space.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5FilterBuilder />
      </Suspense>
    ),
  },
  'l5-chart-builder': {
    title: 'Chart builder',
    blurb: 'Match four questions to four charts, then move a bar chart axis and watch the story change.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5ChartBuilder />
      </Suspense>
    ),
  },
  'l5-pivot-builder': {
    title: 'Pivot builder',
    blurb: 'Fold twelve transactions into a grid, then change the rows, columns and measure.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5PivotBuilder />
      </Suspense>
    ),
  },
  'l5-calculator-sanity': {
    title: 'Calculator sanity check',
    blurb: 'Rebuild a quoted EMI and find the field whose unit breaks it.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5CalculatorSanity />
      </Suspense>
    ),
  },
  'l5-compound-model': {
    title: 'Compound-interest model',
    blurb: 'Move the compounding frequency and watch the effective rate, not the nominal one, change.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5CompoundModel />
      </Suspense>
    ),
  },
  'l5-emi-model': {
    title: 'EMI and amortisation model',
    blurb: 'Split every payment into interest and principal, then add an extra payment and price the saving.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5EmiModel />
      </Suspense>
    ),
  },
  'l5-sip-model': {
    title: 'SIP model',
    blurb: 'Compare a flat contribution with a step-up, and read the corpus as a range rather than a promise.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5SipModel />
      </Suspense>
    ),
  },
  'l5-inflation-model': {
    title: 'Inflation model',
    blurb: 'Restate a goal in future rupees, with the headline rate or the rate for that category.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5InflationModel />
      </Suspense>
    ),
  },
  'l5-retirement-model': {
    title: 'Retirement model',
    blurb: 'Build a corpus, draw it down through inflation, and move the retirement date.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5RetirementModel />
      </Suspense>
    ),
  },
  'l5-cagr-model': {
    title: 'CAGR model',
    blurb: 'Hold the endpoints fixed and change only the holding period: the annual rate moves.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5CagrModel />
      </Suspense>
    ),
  },
  'l5-networth-model': {
    title: 'Net-worth model',
    blurb: 'Apply market, conservative and distress valuations to the same balance sheet.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5NetworthModel />
      </Suspense>
    ),
  },
  'l5-debt-payoff-model': {
    title: 'Debt-payoff model',
    blurb: 'Aim the same extra rupees at the highest rate and the smallest balance, and compare the bills.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5DebtPayoffModel />
      </Suspense>
    ),
  },
  'l5-real-return-model': {
    title: 'Real-return model',
    blurb: 'Peel fees, tax and inflation off a headline return and compare three assets honestly.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5RealReturnModel />
      </Suspense>
    ),
  },
  'l5-scenario-planner': {
    title: 'Scenario planner',
    blurb: 'Pick a named future, see the plan it produces, and read the response written beside it.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5ScenarioPlanner />
      </Suspense>
    ),
  },
  'l5-sensitivity-model': {
    title: 'Sensitivity model',
    blurb: 'Rank four assumptions by how far they move goal coverage, then find the largest.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5SensitivityModel />
      </Suspense>
    ),
  },
  'l5-best-worst-model': {
    title: 'Best-case and worst-case model',
    blurb: 'Shrink the worst case until the essentials survive it without new borrowing.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5BestWorstModel />
      </Suspense>
    ),
  },
  'l5-stress-test-model': {
    title: 'Stress-test model',
    blurb: 'Run job loss, a rate rise and a market fall together and read the breaking point.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5StressTestModel />
      </Suspense>
    ),
  },
  'l5-document-inventory': {
    title: 'Document inventory',
    blurb: 'Mark what is located and what your family could reach, and find the missing row.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5DocumentInventory />
      </Suspense>
    ),
  },
  'l5-secure-storage-setup': {
    title: 'Encrypted storage setup',
    blurb: 'Put the ciphertext, the key and the recovery code in three different places.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5SecureStorageSetup />
      </Suspense>
    ),
  },
  'l5-backup-planner': {
    title: 'Backup planner',
    blurb: 'Count the copies, the media and the offsite one — then prove a restore.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5BackupPlanner />
      </Suspense>
    ),
  },
  'l5-security-hardening': {
    title: 'Attack-surface hardening',
    blurb: 'Close the doors that can reset the others first, and watch the weighted score move.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5SecurityHardening />
      </Suspense>
    ),
  },
  'l5-automation-designer': {
    title: 'Automation designer',
    blurb: 'Time the savings transfer after payday, cap the autopay, and keep one alert.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5AutomationDesigner />
      </Suspense>
    ),
  },
  'l5-emergency-separation': {
    title: 'Emergency-money separation',
    blurb: 'Move the fund behind a wall and see whether a ₹25,000 offer can still reach it.',
    C: () => (
      <Suspense fallback={<SimLoading />}>
        <L5EmergencySeparation />
      </Suspense>
    ),
  },
}