# Security Baseline

## Scope

This document is an engineering baseline, not a certification or legal opinion. A production security plan must reflect the actual deployment, client contracts, data classes, provider terms, and applicable law.

## Non-negotiable controls

### Identity and tenant isolation

- Authenticate every operator before tenant data access.
- Derive tenant access from server-side membership, not a browser-controlled header.
- Enforce least-privilege roles at each read, write, command, approval, and export.
- Add PostgreSQL row-level security or an equivalently tested repository boundary.
- Test cross-tenant object references and hostname/header manipulation.

### Secrets and providers

- Store production credentials in a managed secret store backed by KMS.
- Persist only secret references, authorization metadata, scopes, and health state.
- Separate environments and provider accounts.
- Rotate credentials, record the event, and verify old credentials no longer work.
- Never log access tokens, refresh tokens, private keys, database URLs, signatures, or full sensitive payloads.

### Event ingress

- Verify the exact raw body using the provider’s signature specification.
- Enforce timestamp/replay windows where supported.
- Apply edge rate, size, method, and content-type controls.
- Store and enforce tenant + provider + event idempotency.
- Acknowledge within provider limits and move durable processing to a queue.

### Workflow execution

- Use durable queues, worker leases, bounded retries, and dead-letter handling.
- Require human approval for destructive, financial, public, person-directed, or other high-impact actions.
- Authorize again at execution time; an old queued task does not preserve unlimited permission.
- Record a safe, structured outcome even when the provider fails.
- Use circuit breakers and tenant/provider rate budgets.

### Data protection

- Collect the minimum fields required for the accepted workflow.
- Classify data and define retention/deletion before launch.
- Encrypt data in transit and at rest.
- Redact or tokenize sensitive values in telemetry.
- Back up PostgreSQL and run restore exercises.
- Export audit evidence to immutable storage where contractually required.

## Launch gates

The following must be complete before calling a deployment production-ready:

- [ ] Threat model and data-flow review
- [ ] Identity, session, MFA/SSO, and tenant authorization
- [ ] Cross-tenant isolation tests
- [ ] Secret manager and credential rotation
- [ ] Edge limits and provider-specific webhook verification
- [ ] Durable queue, isolated workers, retries, and dead-letter handling
- [ ] Consent/suppression enforcement for person-directed messaging
- [ ] Audit retention, log redaction, and access review
- [ ] Dependency, container, and infrastructure scanning
- [ ] Backup restore and rollback rehearsal
- [ ] Incident contacts, severity levels, and runbooks
- [ ] Vendor/provider terms and commercial usage disclosure
- [ ] Client acceptance and owner authorization

## Reporting a vulnerability

Do not open a public issue containing exploit details, secrets, personal data, or cross-tenant evidence. Contact the repository owner through the verified contact method on the ACoolNERD GitHub profile and include a minimal, encrypted reproduction path. Credentials discovered during testing should be revoked immediately rather than transmitted in a report.
