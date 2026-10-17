import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band seven — l5-150: close the doors that can reset the others. */

export const l5_150: Chapter = {
  id: 'l5-150',
  title: 'Financial Data Security',
  subtitle: 'Reduce the attack surface of your financial life: least privilege, unique credentials and monitoring.',
  minutes: 9,
  blocks: [
    scene(
      'attack-surface',
      'Four doors into a financial life, three of them open, and the email account that resets the rest.',
    ),
    {
      kind: 'p',
      text: 'Most financial fraud does not break encryption. It logs in. A reused password, an email account without two-factor authentication, an old app with permission to read messages, a phone number that can be ported — these are the doors, and they are usually open because closing them is boring. Attack-surface reduction is the practice of closing the doors that unlock other doors first, then the rest, and then watching for the login that should not have happened.',
    },
    { kind: 'h', text: 'The email account is the master key' },
    {
      kind: 'p',
      text: 'Every bank, broker and insurer will send a password reset to your email. That makes the email account more valuable than any single financial account: whoever controls it can attempt a reset everywhere. It should have the strongest unique password, two-factor authentication that is not SMS where the provider allows it, and no reuse anywhere. The same logic applies to the phone number, which is the recovery route for the email. A SIM-swap attack does not need your password; it needs your number.',
    },
    {
      kind: 'table',
      caption: 'The doors, ranked by what they unlock',
      headers: ['Door', 'What it unlocks', 'Cheapest control'],
      rows: [
        ['Email account', 'Password resets for nearly everything', 'Unique password plus app-based 2FA'],
        ['Phone number', 'SMS codes and account recovery', 'Carrier PIN or port lock, and an authenticator app instead of SMS'],
        ['Bank and UPI apps', 'Payments and account changes', 'App 2FA, device binding, transaction alerts'],
        ['Old app permissions', 'Messages, contacts, storage', 'Revoke anything not used in the last quarter'],
        ['Unlocked device', 'Everything already signed in', 'Long passcode, biometric, auto-lock'],
      ],
    },
    { kind: 'h', text: 'Least privilege, applied to a person' },
    {
      kind: 'p',
      text: 'Least privilege means an app or a person gets only the access needed for the job. On a phone it means revoking SMS and accessibility permissions from a shopping app. In a household it means not sharing the main banking login with everyone: use the bank’s own additional-user or view-only features where they exist. In a browser it means not staying signed in on a shared machine. Every permission and every shared credential is a door that someone else can walk through.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Monitoring is the control that works after prevention fails',
      text: 'Sooner or later one door is left open. The difference between an inconvenience and a loss is how quickly it is noticed. Turn on transaction alerts for every debit above a low threshold, login alerts for every new device, and a monthly check of the credit report for accounts you did not open. An alert that arrives in the first minute is a phone call; one that arrives at month end is a dispute.',
    },
    {
      kind: 'list',
      items: [
        'Use a unique password for email, banking and the phone’s account, and a manager for the rest.',
        'Prefer an authenticator app or a hardware key to SMS, and keep a printed recovery code off the device.',
        'Review app permissions quarterly and revoke anything that can read messages, overlay the screen or control accessibility.',
        'Keep the phone and laptop updated; the update is usually the patch for a known route in.',
        'Turn on transaction and login alerts at the lowest threshold the bank allows.',
        'Check the credit report periodically for loans and cards you did not open.',
      ],
    },
    {
      kind: 'callout',
      tone: 'india',
      title: 'Know the first hour',
      text: 'If an account is compromised, the response is time-sensitive: call the bank’s fraud line, freeze the card or the UPI mandate, change the email password from a different device, and report the incident on the national cyber-crime portal. Keep those numbers and the account list in the document inventory, not in the account that has just been compromised. The first hour is a checklist, not a search.',
    },
    sim(
      'l5-security-hardening',
      'Switch the doors on and off, watch the weighted score, and see which open door is the cheapest to close first.',
    ),
    l5Illustrative(
      'The controls and weights in the lab are illustrative. The master-key logic, least privilege and the monitoring rule are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Attack surface',
          meaning: 'Every way into an account or a device: credentials, recovery routes, permissions, apps and the people who share them.',
        },
        {
          term: 'Least privilege',
          meaning: 'Giving an app or a person only the access required for a specific job, and no more.',
        },
        {
          term: 'SIM swap',
          meaning: 'Porting a phone number to a new SIM so that SMS codes and recovery calls go to the attacker.',
        },
        {
          term: 'Transaction alert',
          meaning: 'A message sent when money moves, which converts a silent loss into a reportable event within minutes.',
        },
      ],
    },
    l5Sources(['certin', 'rbi', 'npci'], [
      'CERT-In — advisories on credential compromise, phishing and device security, including the reporting route for a cyber incident',
      'Reserve Bank of India — the customer-protection and digital-banking rules on alerts, unauthorised transactions and the liability framework',
      'National Payments Corporation of India — the UPI and card-network guidance on mandates, dispute windows and the fraud-reporting process',
    ]),
  ],
  quiz: [
    {
      q: 'Why is the email account the most important one to protect?',
      options: [
        {
          text: 'Because it receives the password resets for almost every other account',
          correct: true,
          why: 'Control of the email is control of the reset route. It should have the strongest unique password and app-based 2FA.',
        },
        {
          text: 'Because it holds the largest balance',
          why: 'Email holds no balance. Its value is the reset route it controls.',
        },
        {
          text: 'Because banks require it to be the same as the account number',
          why: 'No such requirement exists. The email is a recovery channel, not an identifier.',
        },
        {
          text: 'Because it is the only account with two-factor authentication',
          why: 'That would be a reason to protect others, not this one. The email matters because of what it unlocks.',
        },
      ],
    },
    {
      q: 'What does least privilege mean for a phone app?',
      options: [
        {
          text: 'It gets only the permissions needed for its job; anything else is revoked',
          correct: true,
          why: 'An app that can read messages or overlay the screen can intercept codes and taps. The permission is the door.',
        },
        {
          text: 'It gets installed only if it is free',
          why: 'Price is unrelated to permission scope.',
        },
        {
          text: 'It gets all permissions so it works without prompting',
          why: 'Convenience is exactly the trade least privilege rejects.',
        },
        {
          text: 'It gets a unique password',
          why: 'Passwords are for accounts. Permissions are the app’s access to the device.',
        },
      ],
    },
    {
      q: 'Why is monitoring necessary even with strong prevention?',
      options: [
        {
          text: 'Because a door will eventually be left open, and how quickly it is noticed decides the size of the loss',
          correct: true,
          why: 'Prevention reduces the chance; monitoring reduces the damage. Alerts turn a silent loss into a same-day report.',
        },
        {
          text: 'Because monitoring prevents the login',
          why: 'It does not prevent it. It detects it, which is why the two are complementary.',
        },
        {
          text: 'Because alerts replace the need for unique passwords',
          why: 'Alerts detect after the fact. They do not stop credential reuse from working.',
        },
        {
          text: 'Because banks require a monthly visit',
          why: 'There is no such requirement. Monitoring is a risk decision, not a formality.',
        },
      ],
    },
    {
      q: 'What is a SIM swap, and which control reduces it?',
      options: [
        {
          text: 'Porting the phone number to a new SIM; a carrier port lock and app-based 2FA reduce it',
          correct: true,
          why: 'SMS codes follow the number. A port lock makes the swap harder, and an authenticator app removes the dependence on SMS.',
        },
        {
          text: 'Swapping two bank accounts; a nomination reduces it',
          why: 'That is not a SIM swap. The attack is on the mobile number.',
        },
        {
          text: 'Replacing a lost SIM at a store; encryption reduces it',
          why: 'A legitimate replacement is not the attack. The attack is an unauthorised port, and encryption does not address it.',
        },
        {
          text: 'Moving an eSIM between phones; a longer password reduces it',
          why: 'A password does not protect the number. The carrier control and the recovery route do.',
        },
      ],
    },
  ],
  takeaway:
    'Protect the email and the phone number first, give every app the least access it needs, and keep alerts low enough that the first minute is when you find out.',
}
