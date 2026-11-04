import path from 'node:path';
import type { NextConfig } from 'next';

// The repository has a convenience package.json/lockfile at its root as well as this
// project's own. Pin the root to this folder so Turbopack and Vercel's file tracing
// use the right directory instead of guessing.
const projectRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  turbopack: { root: projectRoot },
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
