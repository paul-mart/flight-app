/**
 * Manually maintained transfer bonus list.
 * Source snapshot: https://frequentmiler.com/current-point-transfer-bonuses/
 * Last synced: August 25, 2026
 *
 * To update: edit ACTIVE_TRANSFER_BONUSES below (current/upcoming only).
 */
import { partnerLabelToKey } from '../lib/cpp';

export interface TransferRatio {
  fromPoints: number;
  toPoints: number;
}

export interface TransferBonus {
  transferFrom: string;
  transferTo: string;
  bonusPercent: number;
  summary: string;
  baseTransferRatio: TransferRatio;
  detailsUrl?: string;
  startDate: string;
  endDate: string;
}

export const TRANSFER_BONUS_SOURCE = {
  name: 'Frequent Miler',
  url: 'https://frequentmiler.com/current-point-transfer-bonuses/',
  lastUpdated: '2026-08-25',
} as const;

export const ACTIVE_TRANSFER_BONUSES: TransferBonus[] = [
  {
    transferFrom: 'Multiple bank & hotel programs',
    transferTo: 'Cathay Pacific Asia Miles',
    bonusPercent: 10,
    summary: '10% transfer bonus to Cathay Pacific Asia Miles (Amex, Citi, Capital One, Bilt, Wells Fargo, and select hotel programs; registration required)',
    baseTransferRatio: { fromPoints: 1_000, toPoints: 1_000 },
    detailsUrl: 'https://frequentmiler.com/get-a-10-bonus-when-transferring-bank-or-hotel-points-to-cathay-pacific-asia-miles/',
    startDate: '2026-07-27',
    endDate: '2026-08-28',
  },
  {
    transferFrom: 'Chase Ultimate Rewards',
    transferTo: 'IHG One Rewards',
    bonusPercent: 70,
    summary: '70% transfer bonus to IHG One Rewards',
    baseTransferRatio: { fromPoints: 1_000, toPoints: 1_000 },
    detailsUrl: 'https://frequentmiler.com/chase-is-offering-a-70-100-transfer-bonus-to-ihg-one-rewards-give-it-a-miss/',
    startDate: '2026-07-31',
    endDate: '2026-08-31',
  },
  {
    transferFrom: 'Capital One Miles',
    transferTo: 'Avianca LifeMiles',
    bonusPercent: 15,
    summary: '15% transfer bonus to Avianca LifeMiles',
    baseTransferRatio: { fromPoints: 1_000, toPoints: 1_000 },
    detailsUrl: 'https://frequentmiler.com/15-transfer-bonus-from-capital-one-to-lifemiles-avianca/',
    startDate: '2026-08-01',
    endDate: '2026-08-31',
  },
  {
    transferFrom: 'Citi ThankYou Rewards',
    transferTo: 'Turkish Airlines Miles & Smiles',
    bonusPercent: 40,
    summary: '40% transfer bonus to Turkish Airlines Miles & Smiles',
    baseTransferRatio: { fromPoints: 1_000, toPoints: 1_000 },
    detailsUrl: 'https://frequentmiler.com/current-point-transfer-bonuses/',
    startDate: '2026-08-01',
    endDate: '2026-08-31',
  },
  {
    transferFrom: 'Citi ThankYou Rewards',
    transferTo: 'Leading Hotels of the World',
    bonusPercent: 25,
    summary: '25% transfer bonus to Leading Hotels of the World Leaders Club',
    baseTransferRatio: { fromPoints: 1_000, toPoints: 200 },
    detailsUrl: 'https://frequentmiler.com/citi-thankyou-leading-hotels-of-the-world-lhw-25-percent-transfer-bonus/',
    startDate: '2026-08-23',
    endDate: '2026-09-19',
  },
  {
    transferFrom: 'Amex Membership Rewards',
    transferTo: 'British Airways Avios',
    bonusPercent: 30,
    summary: '30% transfer bonus to British Airways Avios',
    baseTransferRatio: { fromPoints: 1_000, toPoints: 1_000 },
    detailsUrl: 'https://frequentmiler.com/30-percent-transfer-bonus-american-express-membership-rewards-avios-british-airways-iberia-aer-lingus/',
    startDate: '2026-08-03',
    endDate: '2026-09-27',
  },
  {
    transferFrom: 'Amex Membership Rewards',
    transferTo: 'Iberia Avios',
    bonusPercent: 30,
    summary: '30% transfer bonus to Iberia Avios',
    baseTransferRatio: { fromPoints: 1_000, toPoints: 1_000 },
    detailsUrl: 'https://frequentmiler.com/30-percent-transfer-bonus-american-express-membership-rewards-avios-british-airways-iberia-aer-lingus/',
    startDate: '2026-08-03',
    endDate: '2026-09-27',
  },
  {
    transferFrom: 'Amex Membership Rewards',
    transferTo: 'Aer Lingus Avios',
    bonusPercent: 30,
    summary: '30% transfer bonus to Aer Lingus Avios',
    baseTransferRatio: { fromPoints: 1_000, toPoints: 1_000 },
    detailsUrl: 'https://frequentmiler.com/30-percent-transfer-bonus-american-express-membership-rewards-avios-british-airways-iberia-aer-lingus/',
    startDate: '2026-08-03',
    endDate: '2026-09-27',
  },
  {
    transferFrom: 'Chase Ultimate Rewards',
    transferTo: 'Air Canada Aeroplan',
    bonusPercent: 20,
    summary: '20% transfer bonus to Air Canada Aeroplan',
    baseTransferRatio: { fromPoints: 1_000, toPoints: 1_000 },
    detailsUrl: 'https://frequentmiler.com/get-20-bonus-when-transferring-chase-ultimate-rewards-to-air-canada-aeroplan-stack-with-10-cardholder-bonus/',
    startDate: '2026-08-12',
    endDate: '2026-09-30',
  },
];

const FLIGHTHERO_PROGRAMS = new Set([
  'Amex Membership Rewards',
  'Chase Ultimate Rewards',
  'Citi ThankYou Rewards',
  'Capital One Miles',
  'Bilt Rewards',
]);

export function isFlightHeroTransferProgram(transferFrom: string): boolean {
  return FLIGHTHERO_PROGRAMS.has(transferFrom);
}

export function calculateBonusTransferRatio(
  baseRatio: TransferRatio,
  bonusPercent: number,
): { base: TransferRatio; withBonus: TransferRatio } {
  const bonusToPoints = Math.round(baseRatio.toPoints * (1 + bonusPercent / 100));
  return {
    base: baseRatio,
    withBonus: { fromPoints: baseRatio.fromPoints, toPoints: bonusToPoints },
  };
}

export function formatBonusDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function transferFromToLogoPartner(transferFrom: string): string | null {
  const lower = transferFrom.toLowerCase();
  if (lower.includes('amex')) return 'Amex Membership Rewards';
  if (lower.includes('chase')) return 'Chase Ultimate Rewards';
  if (lower.includes('citi')) return 'Citi ThankYou';
  if (lower.includes('capital one')) return 'Capital One';
  if (lower.includes('bilt')) return 'Bilt Rewards';
  return null;
}

export interface ApplicableTransferBonus {
  partner: string;
  bonus: TransferBonus;
  awardPoints: number;
  transferPointsNeeded: number;
}

function normalizeProgramName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function programNamesMatch(a: string, b: string): boolean {
  const left = normalizeProgramName(a);
  const right = normalizeProgramName(b);
  if (!left || !right) return false;
  if (left === right) return true;
  if (left.includes(right) || right.includes(left)) return true;

  const leftTokens = left.split(' ').filter((token) => token.length > 2);
  const rightTokens = right.split(' ').filter((token) => token.length > 2);
  const [shorter, longer] = leftTokens.length <= rightTokens.length
    ? [leftTokens, rightTokens]
    : [rightTokens, leftTokens];
  if (shorter.length === 0) return false;

  return shorter.every((token) =>
    longer.some((candidate) => candidate.includes(token) || token.includes(candidate)),
  );
}

function transferFromMatches(bonusFrom: string, partnerLabel: string): boolean {
  const mappedPartner = transferFromToLogoPartner(bonusFrom);
  if (mappedPartner) {
    const mappedKey = partnerLabelToKey(mappedPartner);
    const partnerKey = partnerLabelToKey(partnerLabel);
    if (mappedKey && partnerKey) return mappedKey === partnerKey;
  }
  return programNamesMatch(bonusFrom, partnerLabel);
}

export function isTransferBonusActive(
  bonus: TransferBonus,
  todayIso = new Date().toISOString().slice(0, 10),
): boolean {
  return todayIso >= bonus.startDate && todayIso <= bonus.endDate;
}

export function calculateTransferPointsNeeded(
  awardPoints: number,
  bonusPercent: number,
): number {
  if (awardPoints <= 0 || bonusPercent <= 0) return awardPoints;
  return Math.ceil(awardPoints / (1 + bonusPercent / 100));
}

export function getApplicableTransferBonuses(
  transferPartners: string[],
  mileageProgram: string,
  awardPoints: number,
  referenceDate = new Date(),
): ApplicableTransferBonus[] {
  const todayIso = referenceDate.toISOString().slice(0, 10);
  const results: ApplicableTransferBonus[] = [];

  for (const partner of transferPartners) {
    const bonus = ACTIVE_TRANSFER_BONUSES.find((candidate) =>
      isTransferBonusActive(candidate, todayIso)
      && isFlightHeroTransferProgram(candidate.transferFrom)
      && transferFromMatches(candidate.transferFrom, partner)
      && programNamesMatch(candidate.transferTo, mileageProgram),
    );

    if (!bonus) continue;

    results.push({
      partner,
      bonus,
      awardPoints,
      transferPointsNeeded: calculateTransferPointsNeeded(awardPoints, bonus.bonusPercent),
    });
  }

  return results.sort((a, b) => a.transferPointsNeeded - b.transferPointsNeeded);
}

export function getTransferBonusForPartner(
  applicableBonuses: ApplicableTransferBonus[],
  partner: string,
): ApplicableTransferBonus | undefined {
  return applicableBonuses.find((entry) => entry.partner === partner);
}
