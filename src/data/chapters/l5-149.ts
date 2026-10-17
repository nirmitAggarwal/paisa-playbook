import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band seven — l5-149: three copies, two media, one offsite, one restore. */

export const l5_149: Chapter = {
  id: 'l5-149',
  title: 'Backups',
  subtitle: 'Run the 3-2-1 backup rule for financial records and prove restores actually work.',
  minutes: 8,
  blocks: [
    scene(
      'backup-rule',
      'Three copies across two kinds of media, with one off site — and ransomware encrypting the laptop.',
    ),
    {
      kind: 'p',
      text: 'A backup is not a copy. A copy on the same laptop fails with the laptop; a copy on a synced cloud drive fails when the sync deletes the file or the account is compromised. A backup is a copy that survives the event that destroys the original, which is why the useful rule is about independence: three copies, on two kinds of media, with one kept off site. The fourth step is the one that turns a hope into a backup — restore a file and open it.',
    },
    { kind: 'h', text: 'The rule, and what each part prevents' },
    {
      kind: 'table',
      caption: 'The 3-2-1 rule applied to a household’s financial records',
      headers: ['Part', 'What it means', 'The failure it survives'],
      rows: [
        ['Three copies', 'The working set plus two backups', 'A single bad edit, deletion or disk failure'],
        ['Two media', 'For example a laptop, an external disk and cloud storage', 'A fault in one device or one technology'],
        ['One off site', 'A copy in a different building, ideally a different provider', 'Fire, theft, flood, a stolen bag'],
        ['Restore tested', 'Open a file from the backup and check it', 'A backup that was never complete, or a key nobody has'],
      ],
    },
    {
      kind: 'p',
      text: 'Cloud sync is not automatically a backup. If the folder is synced, a ransomware process that encrypts the files on the laptop encrypts the synced copies too, and a deletion propagates in seconds. The protection is versioning or a separate backup destination: a copy that the working device cannot delete. Many cloud services offer file history for a limited window; that window is part of the backup design, not a detail.',
    },
    { kind: 'h', text: 'Ransomware is the reason the offline copy exists' },
    {
      kind: 'p',
      text: 'Ransomware encrypts what it can reach, including external drives that are plugged in and network folders that are mounted. An external disk that stays connected is not an offline copy; it is a second victim. The practical design is a copy that is disconnected after each backup, or an offsite destination that the working machine can write to but cannot delete from. Neither is exotic. Both are the difference between a bad week and a lost decade of records.',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Name the three copies and where they are. If two are on the same device, you have two copies of a single point of failure.',
        'Make one copy off site, and check that the provider or the location is independent of your home and your laptop.',
        'Keep one copy disconnected or write-only, so a compromise of the working device cannot reach it.',
        'Test a restore every quarter: open a document, a statement and a photo from the backup, not just a folder listing.',
        'Record the encryption key or recovery code with the backup, in a place the backup itself does not depend on.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'A backup you have never restored is a hypothesis',
      text: 'Backup software fails quietly: a folder was excluded, a drive filled up, a password changed, an archive was corrupt. None of those errors are visible until a restore is attempted. The quarterly test is not bureaucracy; it is the only evidence that the plan works. Restore one file of each type — a scan, a statement, a photo — and open them.',
    },
    {
      kind: 'callout',
      tone: 'india',
      title: 'Incident reporting is separate from recovery',
      text: 'If a device holding financial records is compromised, recovery and reporting are two different tracks. CERT-In publishes guidance on reporting cyber incidents, and banks and payment providers have their own fraud-reporting channels with time limits. Keep the account numbers and the reporting routes in the document inventory, so the first hour is spent reporting rather than searching.',
    },
    sim(
      'l5-backup-planner',
      'Add the copies, the media and the offsite location, then mark the restore tested and watch the 3-2-1 checks complete.',
    ),
    l5Illustrative(
      'The backup setup in the lab is invented. The independence rule, the ransomware exposure and the restore test are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: '3-2-1 rule',
          meaning: 'Three copies of the data, on two kinds of media, with one copy kept off site.',
        },
        {
          term: 'Offline copy',
          meaning: 'A backup that is disconnected or write-only, so malware on the working device cannot alter it.',
        },
        {
          term: 'Restore test',
          meaning: 'Opening a file from the backup to prove that the copy is complete and readable.',
        },
        {
          term: 'Versioning',
          meaning: 'Keeping previous versions of a file so that an overwrite, deletion or encryption can be reversed.',
        },
      ],
    },
    l5Sources(['certin'], [
      'CERT-In — the national cyber-security agency publishes guidance on backup practice and on ransomware, including why an offline copy is the recovery route that works',
    ]),
  ],
  quiz: [
    {
      q: 'What does the 3-2-1 rule require?',
      options: [
        {
          text: 'Three copies, on two kinds of media, with one kept off site',
          correct: true,
          why: 'The rule is about independence. Each part survives a different failure, and the offsite copy survives the event that takes the building.',
        },
        {
          text: 'Three passwords, two devices and one cloud account',
          why: 'Passwords and devices matter, but the rule is about copies and media, not credentials.',
        },
        {
          text: 'Three providers, two countries and one insurance policy',
          why: 'Those can be good practices, but they are not what 3-2-1 means.',
        },
        {
          text: 'Three restores a year, two media and one audit',
          why: 'The restore test is essential, but the rule counts copies, not tests.',
        },
      ],
    },
    {
      q: 'Why is a synced cloud folder not automatically a backup?',
      options: [
        {
          text: 'Because deletions and encryption can propagate through the sync, so the cloud copy fails with the original',
          correct: true,
          why: 'Sync mirrors changes. Without versioning or a separate destination the cloud copy is a second view of the same failure.',
        },
        {
          text: 'Because cloud storage is not encrypted',
          why: 'Encryption is not the issue. The issue is that sync propagates destructive changes.',
        },
        {
          text: 'Because cloud providers delete files after a year',
          why: 'Retention policies vary, but the structural problem is propagation, not a fixed deletion window.',
        },
        {
          text: 'Because a cloud copy cannot be restored',
          why: 'It can be restored. The problem is that it may already contain the damaged version.',
        },
      ],
    },
    {
      q: 'Why does an external disk that stays plugged in not count as an offline copy?',
      options: [
        {
          text: 'Because ransomware can reach any drive that is connected to the infected machine',
          correct: true,
          why: 'The protection comes from disconnection or write-only access, not from the disk being external.',
        },
        {
          text: 'Because external disks fail more often than laptops',
          why: 'Reliability is a separate question. The point here is reachability during an infection.',
        },
        {
          text: 'Because it is on the same desk',
          why: 'Location alone does not decide. Connection to the working machine is what exposes it.',
        },
        {
          text: 'Because it is not encrypted',
          why: 'Encryption at rest is useful but does not stop ransomware from encrypting the files again.',
        },
      ],
    },
    {
      q: 'What is the purpose of a restore test?',
      options: [
        {
          text: 'To prove the backup is complete, readable and usable before an emergency needs it',
          correct: true,
          why: 'Backup failures are silent. Opening files from the copy is the only evidence that the plan works.',
        },
        {
          text: 'To measure the speed of the internet connection',
          why: 'Speed matters for recovery time, but the test is about integrity and usability.',
        },
        {
          text: 'To encrypt the backup',
          why: 'Encryption should already be part of the backup design. The test is about restoring.',
        },
        {
          text: 'To replace the need for an offsite copy',
          why: 'A restore test does not survive a fire. Offsite independence is still required.',
        },
      ],
    },
  ],
  takeaway:
    'Keep three independent copies on two media with one off site and one unreachable by the working device, and prove a restore every quarter.',
}
