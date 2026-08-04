import { describe, it, expect } from 'vitest'
import {
  NIGERIA_PAY_ACCOUNT,
  NIGERIA_PAY_ACCOUNT_2,
  NIGERIA_PAY_ACCOUNTS,
  CURRENCY,
  CURRENCY_NAME,
} from './config'

describe('config', () => {
  it('builds the accounts list from the individual account constants', () => {
    expect(NIGERIA_PAY_ACCOUNTS).toHaveLength(2)
    expect(NIGERIA_PAY_ACCOUNTS[0].account).toBe(NIGERIA_PAY_ACCOUNT)
    expect(NIGERIA_PAY_ACCOUNTS[1].account).toBe(NIGERIA_PAY_ACCOUNT_2)
  })

  it('labels the primary account as Opay', () => {
    expect(NIGERIA_PAY_ACCOUNTS[0].label).toBe('Opay')
  })

  it('includes a bank label and name for the second account', () => {
    expect(NIGERIA_PAY_ACCOUNTS[1].label).toContain('GTB')
    expect(NIGERIA_PAY_ACCOUNTS[1].name).toBeTruthy()
  })

  it('exposes Naira currency metadata', () => {
    expect(CURRENCY).toBe('₦')
    expect(CURRENCY_NAME).toBe('Naira')
  })
})
