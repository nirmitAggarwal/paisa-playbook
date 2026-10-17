import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band seven — l5-147: the inventory is the map, the originals are the territory. */

export const l5_147: Chapter = {
  id: 'l5-147',
  title: 'Personal Document Management',
  subtitle: 'Keep an inventory of financial documents, know what is where, and make it recoverable by your family.',
  minutes: 9,
  blocks: [
    scene(
      'document-inventory',
      'Five documents, their locations and who can reach them — with one row nobody can find.',
    ),
    {
      kind: 'p',
      text: 'Financial documents are not paperwork. They are the evidence that a claim, a transfer, a tax position or an inheritance exists. A household can hold every rupee it needs and still lose a settlement because a policy number cannot be found, or a nomination form was never signed. Document management is the small, unglamorous system that makes the rest of the plan executable.',
    },
    { kind: 'h', text: 'Three facts per document' },
    {
      kind: 'p',
      text: 'For every important document, three facts matter: that it exists, where it is, and who else could find it. Most households can answer the first, are vague on the second, and have never asked the third. The inventory is a list of those three facts, one row per document, updated when something moves. It does not need to be elaborate; it needs to be true and to be findable by someone other than the person who wrote it.',
    },
    {
      kind: 'table',
      caption: 'The rows an inventory needs, and why each one earns its place',
      headers: ['Document', 'Why it matters', 'Original held', 'Copy held'],
      rows: [
        ['PAN and Aadhaar', 'Identity for every account and tax filing', 'Yes', 'Scan in two places'],
        ['Will', 'Decides who gets what, and who acts', 'Signed original', 'Scan with the executor'],
        ['Insurance policies', 'The claim is only as good as the policy number', 'Policy document', 'Scan plus the insurer’s app'],
        ['Property papers', 'Title, registration and tax receipts', 'Originals in a locker', 'Scan with the family'],
        ['Nomination records', 'Avoids a succession process for many accounts', 'With each institution', 'A list of which ones have it'],
      ],
    },
    { kind: 'h', text: 'Originals, copies and the difference' },
    {
      kind: 'list',
      items: [
        'Originals belong somewhere fire-resistant, dry and access-controlled — a locker, a safe, or a trusted relative’s house. A scan is not an original for registration, probate or some claims.',
        'Copies belong in at least two places, one of them off site. A scan on the same laptop as the only photo of the original is one copy, not two.',
        'The inventory belongs with the copies, not with the originals. A list locked in the same locker as the documents it lists does not help anyone during an emergency.',
        'Name scans so they can be found without opening them: document, year, identifier. A folder called “docs” is not a system.',
        'Give one other person the location, not necessarily the contents. The executor, a spouse or an adult child needs to know where to look before they need to look.',
      ],
    },
    {
      kind: 'p',
      text: 'Retention is the other half. Some records have to be kept for a period set by tax or contract; others can go once the purpose is over. The tax law sets a retention period for records that support a return, lenders and insurers set their own, and an estate needs the documents that prove ownership long after the transaction. The practical rule is to keep what proves a right, a payment or an ownership for as long as the right could be challenged, and to check the current rule rather than relying on a number remembered from a previous regime.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'A missing document is a bottleneck, not a filing problem',
      text: 'When a claim or a transfer is stuck, the missing item is usually one of four: a policy number, a nomination, a signed will, or proof of a payment. Each is cheap to fix today and expensive to fix at the moment it is needed. The inventory exercise is worth doing once a year for the same reason a will is worth writing: the cost of not having it is paid by someone else, at the worst possible time.',
    },
    {
      kind: 'callout',
      tone: 'india',
      title: 'Nomination is not inheritance',
      text: 'A nomination tells an institution who to pay; it does not by itself decide who owns the money under the law of succession. Families discover the difference when a nominee and an heir disagree. Keep the nomination records current, and keep the will consistent with them — or the two documents will be read against each other.',
    },
    sim(
      'l5-document-inventory',
      'Mark documents found or missing, and watch the inventory and the family-access count change as the gaps close.',
    ),
    l5Illustrative(
      'The document list in the lab is invented. The three facts per document, the originals-versus-copies rule and the family-access test are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Document inventory',
          meaning: 'A list of important documents with where each is held and who can reach it.',
        },
        {
          term: 'Original',
          meaning: 'The signed or issued document itself, which some processes require and a scan cannot replace.',
        },
        {
          term: 'Nomination',
          meaning: 'An instruction to an institution about who to pay on the holder’s death, which is not the same as a rule of inheritance.',
        },
        {
          term: 'Retention period',
          meaning: 'How long a record has to be kept for tax, contract or estate purposes, set by the relevant rule.',
        },
      ],
    },
    l5Sources(['incometax', 'rbi'], [
      'Income Tax Department — the current record-keeping requirements and the AIS/Form 26AS statements that show which documents support a filed return',
      'Reserve Bank of India — the deposit and nomination rules that determine what an institution will ask for when a holder dies or an account is transferred',
    ]),
  ],
  quiz: [
    {
      q: 'What three facts does a document inventory need for each item?',
      options: [
        {
          text: 'That it exists, where it is, and who else could find it',
          correct: true,
          why: 'Location and access are what make the inventory useful in an emergency. A list that only says “I have it” does not help anyone else.',
        },
        {
          text: 'Its value, its date and its issuer',
          why: 'Those can be useful, but they do not tell anyone where the document is or whether it can be reached.',
        },
        {
          text: 'The password, the folder and the file size',
          why: 'Passwords must not be stored in the inventory, and file size does not help. Location and access do.',
        },
        {
          text: 'The tax year, the section and the form number',
          why: 'Tax details matter for some documents, but the inventory’s job is physical and digital location plus access.',
        },
      ],
    },
    {
      q: 'Why keep the inventory somewhere other than with the originals?',
      options: [
        {
          text: 'Because a list locked with the documents it lists cannot help anyone during an emergency',
          correct: true,
          why: 'The inventory is the map. If the map is in the same locked box, a family member cannot use it to find what they need.',
        },
        {
          text: 'Because the inventory must be notarised',
          why: 'No notarisation is required. The issue is access.',
        },
        {
          text: 'Because originals should never be listed',
          why: 'Originals should be listed. The list itself should be stored separately.',
        },
        {
          text: 'Because digital copies replace originals',
          why: 'A copy does not replace an original for registration, probate or some claims.',
        },
      ],
    },
    {
      q: 'A scan of a property deed sits on the same laptop as the only other copy. How many copies are there?',
      options: [
        {
          text: 'One usable copy: the scan and the “other copy” fail together if the laptop is lost',
          correct: true,
          why: 'Copies count only if they are independent. Two files on one device are one copy for resilience purposes.',
        },
        {
          text: 'Two copies, because there are two files',
          why: 'Independence is what makes a copy useful. Two files on one device share the same failure.',
        },
        {
          text: 'Three copies, including the original',
          why: 'The original counts, but the question is about the copies. Two files on one laptop are still one copy.',
        },
        {
          text: 'None, because a scan is not a document',
          why: 'A scan is a usable copy for many purposes. It is simply not an independent copy when stored alone.',
        },
      ],
    },
    {
      q: 'Why keep nomination records current even when a will exists?',
      options: [
        {
          text: 'Because a nomination directs the institution, while the will governs succession — and the two can conflict',
          correct: true,
          why: 'A nominee is paid by the institution; ownership can still be decided by succession law. Keeping them consistent avoids a dispute.',
        },
        {
          text: 'Because a nomination overrides a will in every case',
          why: 'It does not. The two operate differently, which is exactly why they have to be kept consistent.',
        },
        {
          text: 'Because a will is invalid without a nomination',
          why: 'A will does not depend on a nomination. They are separate instruments.',
        },
        {
          text: 'Because institutions do not accept wills',
          why: 'Institutions have their own claim processes, but that is not a reason to leave nominations stale.',
        },
      ],
    },
  ],
  takeaway:
    'List every important document with its location and who can reach it, keep originals and independent copies in different places, and keep nominations consistent with the will.',
}
