import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band seven — l5-148: encryption moves the secret, it does not remove it. */

export const l5_148: Chapter = {
  id: 'l5-148',
  title: 'Encrypted Storage',
  subtitle: 'Protect financial files with encryption and a key-recovery plan that survives a lost device.',
  minutes: 9,
  blocks: [
    scene(
      'encryption-layer',
      'A document, its ciphertext, and the key held somewhere else — with the recovery code as the way back in.',
    ),
    {
      kind: 'p',
      text: 'A financial folder on a laptop is a folder full of account numbers, statements and identity documents. Encryption turns that folder into noise for anyone who gets the device without the key. It is the single highest-value technical control a household can apply, and it is also the control most likely to lock a family out of its own records, because encryption is only as good as the recovery plan behind it.',
    },
    { kind: 'h', text: 'What encryption does and does not do' },
    {
      kind: 'p',
      text: 'Encryption at rest protects the data when the device is off or the drive is removed. It does not protect an open session: if the laptop is unlocked and the folder is open, the attacker reads what is on the screen. It does not protect a file that has been copied to an unencrypted cloud folder or emailed to yourself. And it does not protect against a weak device passcode, because the passcode is what unlocks the key. The control is a combination: encryption, a strong unlock, and a key that is not stored beside the lock.',
    },
    {
      kind: 'table',
      caption: 'Where each part of the secret should live',
      headers: ['Component', 'Good place', 'Bad place'],
      rows: [
        ['Device unlock', 'A long passcode or biometric plus a passcode fallback', 'A four-digit code that is also the ATM PIN'],
        ['Encryption key', 'The device’s secure enclave, or a password manager vault', 'A text file called keys.txt on the same device'],
        ['Recovery code', 'Printed, in a safe or with a trusted relative', 'A screenshot in the same cloud account'],
        ['Family access', 'A sealed instruction with the executor', 'A shared password in a chat thread'],
      ],
    },
    { kind: 'h', text: 'Password managers are the practical version' },
    {
      kind: 'p',
      text: 'Most households do not need to design a cryptosystem. A reputable password manager gives encrypted storage, unique passwords for every account, and one master secret to protect. The design decision moves to the master password and its recovery: it has to be long, memorised, and not reused anywhere. The manager’s own recovery kit — the one-time key it tells you to print — is the thing that makes the vault survivable when the phone is lost. Print it, store it away from the device, and test that it works before you need it.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Encryption without recovery is a very secure way to lose your own files',
      text: 'The most common encryption failure is not a broken cipher. It is a person with a new phone, a forgotten master password and a recovery code that was never printed. Before encrypting anything, write the recovery route on paper: who holds the code, where it is, and what the process is if the primary device is gone. If that sentence cannot be written, the encryption is not ready.',
    },
    {
      kind: 'list',
      items: [
        'Encrypt the whole disk, not one folder, so a copied file cannot quietly escape the protection.',
        'Use full-disk encryption on the phone and the laptop, and check that it is actually on after an update.',
        'Keep the key separate from the ciphertext: a password manager or a safe, not the same drive.',
        'Print the recovery kit and store it somewhere a family member could reach in an emergency.',
        'Encrypt before uploading: a cloud provider’s default encryption protects the provider’s disk, not your account from your own mistake.',
        'Rehearse the recovery once a year, with the device in hand, before it matters.',
      ],
    },
    {
      kind: 'callout',
      tone: 'india',
      title: 'The data-protection law gives you rights, not encryption',
      text: 'India’s data-protection framework governs how organisations may collect and use personal data; it does not encrypt your own files or restore them for you. Treat the law as a reason to share less, and encryption as the control that protects what you keep. The two are complementary, not substitutes.',
    },
    sim(
      'l5-secure-storage-setup',
      'Choose where the ciphertext, the key and the recovery code live, and see whether the setup survives a stolen laptop.',
    ),
    l5Illustrative(
      'The setup choices in the lab are illustrative. The separation of ciphertext, key and recovery, and the printed-recovery rule, are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Encryption at rest',
          meaning: 'Protecting stored data so that it cannot be read without the key, even if the drive is removed.',
        },
        {
          term: 'Password manager',
          meaning: 'A tool that stores unique passwords and other secrets in an encrypted vault protected by one master secret.',
        },
        {
          term: 'Recovery kit',
          meaning: 'A one-time code or key issued by an encryption or password tool, used to regain access when the device is lost.',
        },
        {
          term: 'Key separation',
          meaning: 'Keeping the key somewhere other than the data it protects, so one theft does not surrender both.',
        },
      ],
    },
    l5Sources(['certin', 'meity'], [
      'CERT-In — the national cyber-security agency publishes advisories on device encryption, password managers and incident reporting',
      'Ministry of Electronics and Information Technology — the data-protection framework and the digital-services guidance that shape how personal data should be stored and shared',
    ]),
  ],
  quiz: [
    {
      q: 'What does full-disk encryption protect?',
      options: [
        {
          text: 'The data when the device is off or the drive is removed, provided the key is not stored with it',
          correct: true,
          why: 'Encryption at rest protects stored data. An unlocked session, a weak passcode or a key on the same drive defeats it.',
        },
        {
          text: 'The data while the device is unlocked and in use',
          why: 'Once unlocked, the operating system can read the files. Encryption at rest does not protect an open session.',
        },
        {
          text: 'Files that were copied to an unencrypted cloud folder',
          why: 'A copied file is protected by wherever it now lives. Encryption does not follow the copy.',
        },
        {
          text: 'The account from a phishing email',
          why: 'Phishing steals credentials, not disk contents. Encryption does not address it.',
        },
      ],
    },
    {
      q: 'Where should the encryption key live?',
      options: [
        {
          text: 'Somewhere separate from the encrypted device, such as a password manager or a safe',
          correct: true,
          why: 'Key separation means one theft does not surrender both halves. A key on the same drive is not protection.',
        },
        {
          text: 'In a text file on the same laptop, so it is easy to find',
          why: 'That defeats the purpose. Anyone with the laptop gets the key too.',
        },
        {
          text: 'In the same cloud folder as the encrypted files',
          why: 'A cloud folder can be compromised with the same account. The key must be independent of the data.',
        },
        {
          text: 'Nowhere — the tool remembers it',
          why: 'The tool may cache it, but the household still needs a recovery route when the device is gone.',
        },
      ],
    },
    {
      q: 'What is the most common way encryption loses a household’s files?',
      options: [
        {
          text: 'A lost device with no usable recovery code',
          correct: true,
          why: 'The cipher is rarely the failure. The recovery plan is. A printed, stored recovery kit is what prevents it.',
        },
        {
          text: 'The encryption algorithm being broken',
          why: 'Strong encryption is not broken in practice. Recovery failures are far more common.',
        },
        {
          text: 'The files being too large to encrypt',
          why: 'Size is not the issue. Full-disk encryption handles the volume.',
        },
        {
          text: 'The cloud provider refusing to store encrypted files',
          why: 'Providers store encrypted files as opaque data. Recovery, not storage, is the risk.',
        },
      ],
    },
    {
      q: 'What does a password manager change about the problem?',
      options: [
        {
          text: 'It gives every account a unique password and concentrates the risk into one master secret with a recovery kit',
          correct: true,
          why: 'The vault makes unique credentials practical. The master password and its printed recovery become the things to protect.',
        },
        {
          text: 'It removes the need for a recovery plan',
          why: 'It makes recovery more important, because the vault now holds everything.',
        },
        {
          text: 'It encrypts files on the laptop automatically',
          why: 'A password manager stores credentials, not the documents. Disk encryption is a separate control.',
        },
        {
          text: 'It makes passwords unnecessary',
          why: 'The vault still protects passwords. It does not remove authentication.',
        },
      ],
    },
  ],
  takeaway:
    'Encrypt at rest, separate the key from the device, print the recovery kit and store it elsewhere, and rehearse the recovery before the device is lost.',
}
