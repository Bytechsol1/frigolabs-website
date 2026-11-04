# Proposed role-permission matrix — existing roles unverified

| Action | Admin | Clinic | Patient |
|---|---|---|---|
| Create requests | Pending policy | Owned clinic/patient only | No |
| View orders/status | Authorized scope | Own clinic | Own records |
| Read reports | Explicit authorization | Authorized clinic relationship | Own approved reports |
| Update coordination/status | Approved operations only | Pending policy | No |
| View audit logs | Restricted admin permission | No by default | No |

No new account types. Enforce scopes server-side on every nested resource and report download; do not trust client tenant IDs. Audit report access and administrative changes. These are proposed boundaries, not verified implementation.
