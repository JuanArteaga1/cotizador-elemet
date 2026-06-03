export interface Service {
  name: string
  price: number
  unit: string
}

export interface SubPackage {
  name: string
  price: number
  unit: string
}

export interface CompletePackage {
  name: string
  price: number
  unit: string
}

export interface Payment {
  name: string
  percentage: number
}

export interface PaymentPlan {
  payments: Payment[]
}

export interface CompanyInfo {
  enabled: boolean
  name: string
  nit: string
  address: string
  phone: string
  email: string
  website: string
  logo: string
}

export interface RepresentativeInfo {
  enabled: boolean
  name: string
  position: string
  document: string
  signature: string
}

export interface BankingInfo {
  enabled: boolean
  bank: string
  accountType: string
  accountNumber: string
  accountHolder: string
}

export interface DocumentConfig {
  consecutiveNumber: number
  terms: string
  footerNote: string
}

export interface InvoiceConfig {
  company: CompanyInfo
  representative: RepresentativeInfo
  banking: BankingInfo
  document: DocumentConfig
}

export interface EstimationConfig {
  obraNegraPrice: number
  obraGrisPrice: number
  acabadosPrice: number
}

export interface AppConfig {
  services: Record<string, Service>
  subPackages: Record<string, SubPackage>
  completePackage: CompletePackage
  paymentPlan: PaymentPlan
  invoice: InvoiceConfig
  estimation: EstimationConfig
}

export interface Facades {
  frontal: boolean
  posterior: boolean
  lateralLeft: boolean
  lateralRight: boolean
}

export interface AdditionalService {
  id: string
  name: string
  price: number
  unit: string
}

export interface QuoteFormData {
  client: string
  project: string
  areaMode: 'dimensions' | 'direct'
  lotShape: 'rectangular' | 'irregular'
  frontal: string
  posterior: string
  latIzq: string
  latDer: string
  directArea: string
  occ: number
  floors: number
  overhangSize: number
  facades: Facades
  selectedServices: string[]
  selectedSubPackages: string[]
  hasCompletePackage: boolean
  discount: number
  additionalServices: AdditionalService[]
}

export interface AreaResult {
  lot: number
  first: number
  overhangArea: number
  upperFloorArea: number
  upper: number
  total: number
  frontal: number
  posterior: number
  latIzq: number
  latDer: number
}

export interface User {
  id: string
  name: string
  email: string
  username: string
  token?: string
}

export type QuoteStatus = 'draft' | 'sent' | 'paid' | 'completed'

export interface Quote {
  id: number
  date: string
  client: string
  project: string
  area: number
  price: number
  status: QuoteStatus
  data: string | any // string when parsed from DB, object when created locally for SaaS JSONB
}
