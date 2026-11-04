# Database and deployment changes

None. No Prisma schema or PostgreSQL configuration was available. No connection attempted, no migration generated, no production database reset or records modified.

Review existing order/shipment/audit tables before proposing additive nullable fields or event uniqueness indexes. Preserve Terra provider IDs and history. Use expand/backfill/validate rollout, reviewed backups, feature flags and compatible rollback. Do not delete new audit/history data on rollback. Existing deployment compatibility remains unverified.
