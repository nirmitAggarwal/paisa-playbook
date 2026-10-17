import { motion } from 'framer-motion'
import type { SceneName } from '../../types'
import * as behaviour from './behaviour'
import * as l1x from './l1-extra'
import * as l2x from './l2-extra'
import * as l3x from './l3-extra'
import * as l4x from './l4-extra'
import * as l5x from './l5-extra'
import * as l5m from './l5-money'
import * as l5s from './l5-system'
import * as l5i from './l5-invest'
import * as l5r from './l5-retire'
import * as l5n from './l5-inst'
import * as l5n2 from './l5-inst2'
import * as l5n3 from './l5-inst3'
import * as l5e from './l5-estate'
import * as l5l from './l5-life'
import * as l5p from './l5-protect'
import * as l5f from './l5-fraud'
import * as l5a from './l5-ai'
import * as l5sh from './l5-sheet'
import * as l5c from './l5-calc'
import * as l5m2 from './l5-model'
import * as l5s2 from './l5-security'
import * as level2 from './level2'
import * as level3 from './level3'
import * as level4 from './level4'
import * as money from './money'
import * as payments from './payments'
import * as planning from './planning'

/* Call-scene components are authored SVG scenes that take props (for example a step or rate).
 * When a chapter block references them, it does so via the scene helper below rather than
 * importing the raw component. That keeps chapter content declarative.
 */
type SceneFn = () => React.ReactElement
export const SCENES: Record<SceneName, SceneFn> = {
  coins: () => <money.Coins />,
  barter: () => <money.Barter />,
  timeline: () => <money.Timeline />,
  rupee: () => <money.Rupee />,
  'rupee-erode': () => <money.RupeeErode />,
  'money-flow': () => <money.MoneyFlow />,
  'rbi-funnel': () => <money.RbiFunnel />,
  'bank-pyramid': () => <money.BankPyramid />,
  'income-streams': () => <behaviour.IncomeStreams />,
  'pie-needs-wants': () => <behaviour.PieNeedsWants />,
  'spend-leak': () => <behaviour.SpendLeak />,
  'ad-trap': () => <behaviour.AdTrap />,
  'peer-circle': () => <behaviour.PeerCircle />,
  'budget-pie': () => <planning.BudgetPie />,
  'expense-bars': () => <planning.ExpenseBars />,
  'goal-ladder': () => <planning.GoalLadder />,
  'safe-vs-risk': () => <planning.SafeVsRisk />,
  'interest-growth': () => <planning.InterestGrowth />,
  'inflation-crocodile': () => <planning.InflationCrocodile />,
  'opportunity-fork': () => <planning.OpportunityFork />,
  'upi-flow': () => <payments.UpiFlow />,
  'atm-machine': () => <payments.AtmMachine />,
  'payment-rail': () => <payments.PaymentRail />,
  'scam-hook': () => <payments.ScamHook />,
  'phishing-hook': () => <payments.PhishingHook />,
  shield: () => <payments.Shield />,
  'balance-sheet': () => <level2.BalanceSheet />,
  'emi-split': () => <level2.EmiSplit />,
  'emergency-ladder': () => <level2.EmergencyLadder />,
  'minpayment-trap': () => <level2.MinPaymentTrap />,
  'secured-vs-unsecured': () => <level2.SecuredVsUnsecured />,
  'insurance-umbrella': () => <level2.InsuranceUmbrella />,
  'ponzi-chain': () => <level2.PonziChain />,
  pyramid: () => <level2.PyramidScheme />,
  'fomo-chase': () => <level2.FomoChase />,
  'lifestyle-inflation': () => <level2.LifestyleInflation />,
  dashboard: () => <level2.Dashboard />,
  'score-meter': () => <level2.ScoreMeter />,
  'salary-deductions': () => <level2.SalaryDeductions />,
  'risk-return-curve': () => <level3.RiskReturnCurve />,
  'capacity-tolerance': () => <level3.CapacityVsTolerance />,
  'yield-curve': () => <level3.YieldCurve />,
  'price-yield-inverse': () => <level3.PriceYieldInverse />,
  'profit-waterfall': () => <level3.ProfitWaterfall />,
  'share-slice': () => <level3.ShareSlice />,
  'market-cap-ladder': () => <level3.MarketCapLadder />,
  'fee-drag-visual': () => <level3.FeeDragVisual />,
  'allocation-pie': () => <level3.AllocationPie />,
  'currency-erosion': () => <level3.CurrencyErosion />,
  'dividend-stream': () => <level3.DividendStream />,
  'property-cashflow': () => <level3.PropertyCashflow />,
  'time-horizon': () => <level3.TimeHorizon />,
  'passive-vs-active': () => <level3.PassiveVsActive />,
  'real-vs-nominal': () => <level3.RealVsNominal />,
  'gold-role': () => <level3.GoldRole />,
  'money-allocation': () => <level3.MoneyAllocation />,
  'tax-bracket': () => <level4.TaxBracket step={2} />,
  'tds-flow': () => <level4.TdsFlow />,
  'cover-ladder': () => <level4.CoverLadder step={3} />,
  'emi-split-early': () => <level4.EmiSplit />,
  'nps-annuity': () => <level4.NpsAnnuity />,
  'call-put': () => <level4.CallPut />,
  'rent-vs-buy': () => <level4.RentVsBuy />,
  'loan-amort': () => <level4.LoanAmort />,
  'deriv-payoff': () => <level4.DerivPayoff />,
  'currency-risk': () => <level4.CurrencyRisk />,
  'growth-vs-value': () => <level4.GrowthVsValue />,
  'corpus-ladder': () => <level4.CorpusLadder step={3} />,
  // Additional illustrations
  'freelance-climb': () => <l1x.FreelanceClimb />,
  'fee-addons': () => <l2x.FeeAddons />,
  'foreclosure-balance': () => <l2x.ForeclosureBalance />,
  'vehicle-emi-true': () => <l2x.VehicleEmiTrue />,
  'due-date-clock': () => <l2x.DueDateClock />,
  'late-fee-record': () => <l2x.LateFeeRecord />,
  'policy-gaps': () => <l2x.PolicyGaps />,
  'claim-steps': () => <l2x.ClaimSteps />,
  'limit-vs-repay': () => <l2x.LimitVsRepay />,
  'default-cascade': () => <l2x.DefaultCascade />,
  'credit-exposure': () => <l2x.CreditExposure />,
  'life-cover-dependants': () => <l2x.LifeCoverDependants />,
  'motor-third-party': () => <l2x.MotorThirdParty />,
  'bnpl-stack': () => <l2x.BnplStack />,
  'land-idle': () => <l3x.LandIdle />,
  'apartment-dues': () => <l3x.ApartmentDues />,
  'appreciation-forecast': () => <l3x.AppreciationForecast />,
  'property-tax-clock': () => <l3x.PropertyTaxClock />,
  'stamp-duty-cost': () => <l3x.StampDutyCost />,
  'registration-records': () => <l3x.RegistrationRecords />,
  'maintenance-drag': () => <l3x.MaintenanceDrag />,
  'property-liquidity': () => <l3x.PropertyLiquidity />,
  'mf-pool': () => <l3x.MfPool />,
  'nav-calc': () => <l3x.NavCalc />,
  'hybrid-mix': () => <l3x.HybridMix />,
  'diversify-fail': () => <l3x.DiversifyFail />,
  'portfolio-build': () => <l3x.PortfolioBuild />,
  'target-vs-actual': () => <l3x.TargetVsActual />,
  'expense-lines': () => <l3x.ExpenseLines />,
  'cash-vs-profit': () => <l3x.CashVsProfit />,
  'eps-split': () => <l3x.EpsSplit />,
  'roe-levers': () => <l3x.RoeLevers />,
  'debt-equity-mix': () => <l3x.DebtEquityMix />,
  'amc-expense': () => <l3x.AmcExpense />,
  'credit-spread': () => <l3x.CreditSpread />,
  'bond-terms': () => <l3x.BondTerms />,
  'credit-vs-rate-risk': () => <l3x.CreditVsRateRisk />,
  'debt-fund-nav': () => <l3x.DebtFundNav />,
  'nifty-50': () => <l3x.Nifty50 />,
  'pb-ratio': () => <l3x.PbRatio />,
  'nifty-weights': () => <l3x.NiftyWeights />,
  'sensex-30': () => <l3x.Sensex30 />,
  'manager-discretion': () => <l3x.ManagerDiscretion />,
  'etf-wrapper': () => <l3x.EtfWrapper />,
  'physical-gold-cost': () => <l3x.PhysicalGoldCost />,
  'silver-volatility': () => <l3x.SilverVolatility />,
  'gain-pre-post-tax': () => <l3x.GainPrePostTax />,
  'face-vs-price': () => <l3x.FaceVsPrice />,
  'broker-costs': () => <l3x.BrokerCosts />,
  'decision-journal': () => <l3x.DecisionJournal />,
  'term-cover-rungs': () => <l4x.TermCoverRungs />,
  'whole-life-bundle': () => <l4x.WholeLifeBundle />,
  'endowment-mix': () => <l4x.EndowmentMix />,
  'ulip-charges': () => <l4x.UlipCharges />,
  'deductible-tradeoff': () => <l4x.DeductibleTradeoff />,
  'copay-slice': () => <l4x.CopaySlice />,
  'waiting-period': () => <l4x.WaitingPeriod />,
  'cover-exclusions': () => <l4x.CoverExclusions />,
  'cover-claim-steps': () => <l4x.CoverClaimSteps />,
  'contract-sizing': () => <l4x.ContractSizing />,
  'margin-leverage': () => <l4x.MarginLeverage />,
  'expiry-intrinsic': () => <l4x.ExpiryIntrinsic />,
  'mark-to-market': () => <l4x.MarkToMarket />,
  'naked-speculation': () => <l4x.NakedSpeculation />,
  'risk-transfer': () => <l4x.RiskTransfer />,
  'commodity-futures-roles': () => <l4x.CommodityFuturesRoles />,
  'index-futures': () => <l4x.IndexFutures />,
  'direct-vs-indirect': () => <l4x.DirectVsIndirect />,
  'taxable-base': () => <l4x.TaxableBase />,
  'deduction-effect': () => <l4x.DeductionEffect />,
  'capital-gains-holding': () => <l4x.CapitalGainsHolding />,
  'stcg-vs-ltcg': () => <l4x.StcgVsLtcg />,
  'business-taxes': () => <l4x.BusinessTaxes />,
  'inflation-target': () => <l4x.InflationTarget />,
  'epf-monthly': () => <l4x.EpfMonthly />,
  'annuity-income': () => <l4x.AnnuityIncome />,
  'education-payoff': () => <l4x.EducationPayoff />,
  'runway-cash': () => <l4x.RunwayCash />,
  'moneyness': () => <l4x.Moneyness />,
  'premium-split': () => <l4x.PremiumSplit />,
  'time-decay': () => <l4x.TimeDecay />,
  'volatility-effect': () => <l4x.VolatilityEffect />,
  'put-protection': () => <l4x.PutProtection />,
  'accounting-quality': () => <l4x.AccountingQuality />,
  'llp-liability': () => <l4x.LlpLiability />,
  'revenue-records': () => <l4x.RevenueRecords />,
  'scholarship-offset': () => <l4x.ScholarshipOffset />,
  'profit-growth-cash': () => <l4x.ProfitGrowthCash />,
  'exporter-importer': () => <l4x.ExporterImporter />,
  'forward-lock': () => <l4x.ForwardLock />,
  'sole-prop-exposure': () => <l4x.SolePropExposure />,
  'equity-financing': () => <l4x.EquityFinancing />,
  'moat-defence': () => <l4x.MoatDefence />,
  'cashflow-reality': () => <l4x.CashflowReality />,
  'partnership-split': () => <l4x.PartnershipSplit />,
  'downpayment-effect': () => <l4x.DownpaymentEffect />,
  'raise-compounding': () => <l4x.RaiseCompounding />,
  // Level 5 — band one
  'first-payslip-split': () => <l5x.FirstPayslipSplit />,
  'negotiation-band': () => <l5x.NegotiationBand />,
  'offer-total-value': () => <l5x.OfferTotalValue />,
  'ctc-waterfall': () => <l5x.CtcWaterfall />,
  // Level 5 — band one, batch 2
  'benefit-stack': () => <l5m.BenefitStack />,
  'pf-ledger': () => <l5m.PfLedger />,
  'regime-seesaw': () => <l5m.RegimeSeesaw />,
  'monthly-cycle': () => <l5m.MonthlyCycle />,
  'cover-months': () => <l5m.CoverMonths />,
  'sinking-jars': () => <l5m.SinkingJars />,
  'budget-shapes': () => <l5m.BudgetShapes />,
  'zero-bucket': () => <l5m.ZeroBucket />,
  'frame-vs-reality': () => <l5m.FrameVsReality />,
  'cashflow-timeline': () => <l5m.CashflowTimeline />,
  // Level 5 — band one, batch 3
  'auto-transfer-rail': () => <l5s.AutoTransferRail />,
  'sip-machine': () => <l5s.SipMachine />,
  'bill-clock': () => <l5s.BillClock />,
  'alert-trials': () => <l5s.AlertTrials />,
  'dashboard-one-page': () => <l5s.DashboardOnePage />,
  // Level 5 — band two, batch 1
  'construction-blocks': () => <l5i.ConstructionBlocks />,
  'weight-targets': () => <l5i.WeightTargets />,
  'diversity-web': () => <l5i.DiversityWeb />,
  'rebalance-band': () => <l5i.RebalanceBand />,
  'goal-bucket-tree': () => <l5i.GoalBucketTree />,
  'reit-cashflow': () => <l5i.ReitCashflow />,
  'invit-toll-road': () => <l5i.InvitTollRoad />,
  'currency-bridge': () => <l5i.CurrencyBridge />,
  'etf-nav-gap': () => <l5i.EtfNavGap />,
  'alternatives-map': () => <l5i.AlternativesMap />,
  'j-curve': () => <l5r.JCurve />,
  'power-law': () => <l5r.PowerLaw />,
  'liquidity-ladder': () => <l5r.LiquidityLadder />,
  'fee-stack': () => <l5r.FeeStack />,
  'tax-year-grid': () => <l5r.TaxYearGrid />,
  'retirement-bridge': () => <l5r.RetirementBridge />,
  'multiple-ladder': () => <l5r.MultipleLadder />,
  'fire-timeline': () => <l5r.FireTimeline />,
  'rate-lever': () => <l5r.RateLever />,
  'income-stream-types': () => <l5r.IncomeStreamTypes />,
  // Level 5 — band three, batch 1: institutions and contracts
  'regulator-map': () => <l5n.RegulatorMap />,
  'rbi-tools': () => <l5n.RbiTools />,
  'sebi-shield': () => <l5n.SebiShield />,
  'irdai-records': () => <l5n.IrdaiRecords />,
  'pension-architecture': () => <l5n.PensionArchitecture />,
  'bank-choice-grid': () => <l5n.BankChoiceGrid />,
  'nbfc-boundary': () => <l5n.NbfcBoundary />,
  'insurer-scoreboard': () => <l5n.InsurerScoreboard />,
  'amc-economics': () => <l5n.AmcEconomics />,
  'exchange-plumbing': () => <l5n.ExchangePlumbing />,
  // Level 5 — band three, batch 2: brokers, depositories, identity, protection, contracts
  'broker-fee-anatomy': () => <l5n2.BrokerFeeAnatomy />,
  'depository-layer': () => <l5n2.DepositoryLayer />,
  'kyc-flow': () => <l5n2.KycFlow />,
  'aml-funnel': () => <l5n2.AmlFunnel />,
  'protection-layers': () => <l5n2.ProtectionLayers />,
  'complaint-ladder': () => <l5n2.ComplaintLadder />,
  'rights-pathway': () => <l5n2.RightsPathway />,
  'contract-anatomy': () => <l5n2.ContractAnatomy />,
  'loan-clause-map': () => <l5n2.LoanClauseMap />,
  'policy-anatomy': () => <l5n2.PolicyAnatomy />,
  // Level 5 — band three, batch 3: card and tenancy terms, hidden charges, fees,
  // penalties, clauses, and negotiating pay, rent, loans and freelance rates
  'card-terms': () => <l5n3.CardTerms />,
  'broker-agreement-map': () => <l5n3.BrokerAgreementMap />,
  'rent-agreement-terms': () => <l5n3.RentAgreementTerms />,
  'hidden-charge-radar': () => <l5n3.HiddenChargeRadar />,
  'fee-normaliser': () => <l5n3.FeeNormaliser />,
  'penalty-clock': () => <l5n3.PenaltyClock />,
  'clause-library': () => <l5n3.ClauseLibrary />,
  'raise-negotiation': () => <l5n3.RaiseNegotiation />,
  'rent-levers': () => <l5n3.RentLevers />,
  'loan-levers': () => <l5n3.LoanLevers />,
  'freelance-rate-build': () => <l5n3.FreelanceRateBuild />,
  // Level 5 — band four, batch 1: the estate, the family and the paperwork around both
  'estate-map': () => <l5e.EstateMap />,
  'nominee-grid': () => <l5e.NomineeGrid />,
  'beneficiary-tree': () => <l5e.BeneficiaryTree />,
  'will-anatomy': () => <l5e.WillAnatomy />,
  'inheritance-path': () => <l5e.InheritancePath />,
  'succession-timeline': () => <l5e.SuccessionTimeline />,
  'joint-holding-modes': () => <l5e.JointHoldingModes />,
  'family-money-map': () => <l5e.FamilyMoneyMap />,
  'marriage-money-defaults': () => <l5e.MarriageMoneyDefaults />,
  'parent-support-plan': () => <l5e.ParentSupportPlan />,
  // Level 5 — band four, batch 2: dependants, education, big purchases and crises
  'dependant-matrix': () => <l5l.DependantMatrix />,
  'education-ladder': () => <l5l.EducationLadder />,
  'tco-breakdown': () => <l5l.TcoBreakdown />,
  'house-cost-stack': () => <l5l.HouseCostStack />,
  'vehicle-five-year-cost': () => <l5l.VehicleFiveYearCost />,
  'education-payback': () => <l5l.EducationPayback />,
  'rent-buy-crossover': () => <l5l.RentBuyCrossover />,
  'new-used-curve': () => <l5l.NewUsedCurve />,
  'cash-finance-seesaw': () => <l5l.CashFinanceSeesaw />,
  'crisis-order': () => <l5l.CrisisOrder />,
  // Level 5 — band four, batch 3: job loss, medical claims, crashes, recession,
  // debt, fraud response, account compromise, identity theft, scams and gurus
  'runway-months': () => <l5p.RunwayMonths />,
  'hospital-flow': () => <l5p.HospitalFlow />,
  'crash-playbook': () => <l5p.CrashPlaybook />,
  'recession-map': () => <l5p.RecessionMap />,
  'debt-triage': () => <l5p.DebtTriage />,
  'golden-hour': () => <l5p.GoldenHour />,
  'compromise-recovery': () => <l5p.CompromiseRecovery />,
  'identity-trail': () => <l5p.IdentityTrail />,
  'scam-triage': () => <l5p.ScamTriage />,
  'guru-credibility': () => <l5p.GuruCredibility />,
  // Level 5 — band three, batch 4: fraud & due diligence (l5-101 to l5-113)
  'pump-dump-cycle': () => <l5f.PumpDumpCycle />,
  'deepfake-check': () => <l5f.DeepfakeCheck />,
  'fake-platform-funnel': () => <l5f.FakePlatformFunnel />,
  'job-offer-redflags': () => <l5f.JobOfferRedflags />,
  'crypto-custody-layers': () => <l5f.CustodyLayers />,
  'social-engineering-loop': () => <l5f.SocialEngineeringLoop />,
  'diligence-checklist': () => <l5f.DiligenceChecklist />,
  'product-compare-axes': () => <l5f.ProductCompareAxes />,
  'return-source-tree': () => <l5f.ReturnSourceTree />,
  'risk-matrix': () => <l5f.RiskMatrix />,
  'time-to-cash': () => <l5f.TimeToCash />,
  'fee-waterfall': () => <l5f.FeeWaterfall />,
  'verification-desk': () => <l5f.VerificationDesk />,
  // Level 5 — band five, AI tools (l5-114 to l5-122)
  'ai-assist-boundary': () => <l5a.AiAssistBoundary />,
  'ai-budget-loop': () => <l5a.AiBudgetLoop />,
  'ai-formula-test': () => <l5a.AiFormulaTest />,
  'doc-ai-verify': () => <l5a.DocAiVerify />,
  'learning-loop': () => <l5a.LearningLoop />,
  'ai-failure-modes': () => <l5a.AiFailureModes />,
  'hallucination-hunt': () => <l5a.HallucinationHunt />,
  'redaction-filter': () => <l5a.RedactionFilter />,
  'credential-wall': () => <l5a.CredentialWall />,
  // Level 5 — band six, batch 1: spreadsheets and models (l5-123 to l5-132)
  'workbook-architecture': () => <l5sh.WorkbookArchitecture />,
  'sheet-feature-map': () => <l5sh.SheetFeatureMap />,
  'reference-types': () => <l5sh.ReferenceTypes />,
  'sum-traps': () => <l5sh.SumTraps />,
  'if-branch': () => <l5sh.IfBranch />,
  'criteria-grid': () => <l5sh.CriteriaGrid />,
  'lookup-line': () => <l5sh.LookupLine />,
  'filter-sieve': () => <l5sh.FilterSieve />,
  'chart-choice': () => <l5sh.ChartChoice />,
  'pivot-cube': () => <l5sh.PivotCube />,
  // Level 5 — band six, batch 2: the calculators (l5-133 to l5-142)
  'calculator-inputs': () => <l5c.CalculatorInputs />,
  'compound-curves': () => <l5c.CompoundCurves />,
  'amortisation-stack': () => <l5c.AmortisationStack />,
  'sip-ladder': () => <l5c.SipLadder />,
  'inflation-bridge': () => <l5c.InflationBridge />,
  'retirement-phases': () => <l5c.RetirementPhases />,
  'cagr-smoothing': () => <l5c.CagrSmoothing />,
  'networth-waterline': () => <l5c.NetworthWaterline />,
  'repayment-paths': () => <l5c.RepaymentPaths />,
  'real-return-layers': () => <l5c.RealReturnLayers />,
  // Level 5 — band six, batch 3: scenarios, sensitivity, cases and stress
  'scenario-fan': () => <l5m2.ScenarioFan />,
  'tornado-chart': () => <l5m2.TornadoChart />,
  'case-range': () => <l5m2.CaseRange />,
  'stress-test-panel': () => <l5m2.StressTestPanel />,
  // Level 5 — band seven, batch 1: documents, encryption, backups, security, automation, separation
  'document-inventory': () => <l5s2.DocumentInventory />,
  'encryption-layer': () => <l5s2.EncryptionLayer />,
  'backup-rule': () => <l5s2.BackupRule />,
  'attack-surface': () => <l5s2.AttackSurface />,
  'automation-loop': () => <l5s2.AutomationLoop />,
  'separation-wall': () => <l5s2.SeparationWall />,
}

export function Scene({ name, caption }: { name: SceneName; caption?: string }) {
  const Body = SCENES[name]
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-ink-900/80 to-ink-950/60">
      <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label={caption ?? name}>
        {typeof Body === 'function' ? <Body /> : Body}
      </svg>
      {caption && (
        <figcaption className="border-t border-white/5 px-4 py-2 text-center text-xs text-ink-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function SceneCard({ name, caption }: { name: SceneName; caption?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <Scene name={name} caption={caption} />
    </motion.div>
  )
}