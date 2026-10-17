import type { Chapter } from '../../types'
import { l5_147 } from './l5-147'
import { l5_148 } from './l5-148'
import { l5_149 } from './l5-149'
import { l5_150 } from './l5-150'
import { l5_151 } from './l5-151'
import { l5_152 } from './l5-152'

/**
 * Level 5, band seven — chapters l5-147 to l5-152, security and habits.
 *
 * The band is about the systems that keep a plan executable: the documents that
 * prove a right, the encryption that protects them, the backups that survive a
 * device, the attack surface that decides whether any of it matters, the
 * automations that remove a monthly decision, and the wall that keeps the
 * emergency fund from becoming spending money.
 *
 * Authored as one module per chapter and collected here, so `level5.ts` has a
 * single import for the batch.
 */
export const l5Security: Record<string, Chapter> = {
  'l5-147': l5_147,
  'l5-148': l5_148,
  'l5-149': l5_149,
  'l5-150': l5_150,
  'l5-151': l5_151,
  'l5-152': l5_152,
}
