import type { IconName } from '@/data/icons';

export interface HeroNode {
  id: string;
  label: string;
  /** Shown on hover — short by design. */
  caption: string;
  icon: IconName;
  /** Percentage coordinates inside the square visual (0–100). */
  x: number;
  y: number;
  /** Entrance delay, following the choreography in the brief. */
  delay: number;
}

/**
 * The six solution types that radiate from the mark on desktop:
 *
 *            ERP
 *      AI          CRM
 *          NEXVERR
 *    CLOUD          MOBILE
 *         AUTOMATION
 */
export const desktopNodes: HeroNode[] = [
  { id: 'erp', label: 'ERP', caption: 'Business Systems', icon: 'Boxes', x: 50, y: 7, delay: 1.75 },
  { id: 'crm', label: 'CRM', caption: 'Customer Pipelines', icon: 'Users', x: 87, y: 29, delay: 1.83 },
  { id: 'ai', label: 'AI', caption: 'Applied Intelligence', icon: 'BrainCircuit', x: 13, y: 29, delay: 1.91 },
  { id: 'mobile', label: 'MOBILE', caption: 'Apps On The Move', icon: 'Smartphone', x: 87, y: 71, delay: 1.99 },
  { id: 'cloud', label: 'CLOUD', caption: 'Deploy & Scale', icon: 'Cloud', x: 13, y: 71, delay: 2.07 },
  { id: 'automation', label: 'AUTOMATION', caption: 'Fewer Manual Steps', icon: 'Workflow', x: 50, y: 93, delay: 2.15 },
];

/** Simplified set for phones — three nodes, laid out for a narrow viewport. */
export const mobileNodes: HeroNode[] = [
  { id: 'web', label: 'WEB', caption: 'Digital Presence', icon: 'Globe', x: 50, y: 8, delay: 1.5 },
  { id: 'ai', label: 'AI', caption: 'Applied Intelligence', icon: 'BrainCircuit', x: 15, y: 76, delay: 1.62 },
  { id: 'cloud', label: 'CLOUD', caption: 'Deploy & Scale', icon: 'Cloud', x: 85, y: 76, delay: 1.74 },
];

export const HERO_CENTER = { x: 50, y: 50 } as const;

/**
 * Closed ring through every node, ordered by angle around the centre and bowed
 * outward slightly. It reads as the system the solutions belong to, rather than
 * six unrelated spokes.
 */
export function ringPath(nodes: HeroNode[], bow = 5): string {
  if (nodes.length < 3) return '';

  const ordered = [...nodes].sort(
    (a, b) =>
      Math.atan2(a.y - HERO_CENTER.y, a.x - HERO_CENTER.x) -
      Math.atan2(b.y - HERO_CENTER.y, b.x - HERO_CENTER.x),
  );

  // Push each control point away from the centre so every edge bows outward,
  // including the closing one back to the first node.
  const curveTo = (from: HeroNode, to: HeroNode) => {
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const dx = midX - HERO_CENTER.x;
    const dy = midY - HERO_CENTER.y;
    const length = Math.hypot(dx, dy) || 1;

    return `Q${midX + (dx / length) * bow} ${midY + (dy / length) * bow} ${to.x} ${to.y}`;
  };

  const segments = ordered.map((node, index) =>
    curveTo(ordered[(index + ordered.length - 1) % ordered.length], node),
  );

  // Start at the last node so the first segment closes the loop cleanly.
  const start = ordered[ordered.length - 1];
  return `M${start.x} ${start.y} ${segments.join(' ')}`;
}

/**
 * Trims a centre-to-node line at both ends so it starts outside the logo and
 * stops before the node card, rather than running underneath either.
 */
export function connectionPath(node: HeroNode, startGap: number, endGap: number) {
  const dx = node.x - HERO_CENTER.x;
  const dy = node.y - HERO_CENTER.y;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;

  return {
    x1: HERO_CENTER.x + ux * startGap,
    y1: HERO_CENTER.y + uy * startGap,
    x2: node.x - ux * endGap,
    y2: node.y - uy * endGap,
  };
}
