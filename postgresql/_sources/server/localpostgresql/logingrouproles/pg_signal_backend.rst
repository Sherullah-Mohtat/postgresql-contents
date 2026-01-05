pg_signal_backend
===================

----------------------------
What is pg_signal_backend?
----------------------------

pg_signal_backend allows a role to send signals to other PostgreSQL backend processes (sessions).

In simple words:
    “I can control or terminate other users’ database sessions.”

This role gives **process-level control**, not data access.

What this role ALLOWS

A role with pg_signal_backend can:
    Terminate sessions

.. code-block:: postgres 

    SELECT pg_terminate_backend(pid);

Cancel running queries

.. code-block:: postgres 

    SELECT pg_cancel_backend(pid);

**Interrupt long-running or stuck queries**

🚫 Kill sessions holding locks

Very useful for:
	- Deadlocks
	- Blocked DDL
	- Maintenance windows

**What it does NOT allow**

.. list-table::
    :header-rows: 1

    * - Capability
      - Allowed
    * - Read table data
      - ❌
    * - Modify table data
      - ❌
    * - Read server files
      - ❌
    * - Write files
      - ❌
    * - Execute OS commands
      - ❌

This role is **control**, not **access**

**Mental model**

pg_signal_backend = **“Task Manager for PostgreSQL sessions”**

Just like:
	- Killing a process in Linux
	- Ending a task in Windows Task Manager

Typical use cases
    - ✅ DBAs
    - ✅ Operations / SRE teams
    - ✅ Maintenance scripts
    - ✅ Monitoring systems that auto-kill runaway queries

**Why this role is DANGEROUS**

Because misuse can:
    - Kill production queries
    - Disconnect applications
    - Abort transactions
    - Cause partial work loss
    - Break deployments

Example disaster:

.. code-block:: postgres 

    SELECT pg_terminate_backend(pid)
    FROM pg_stat_activity;

This kills **EVERY session**

**Real-world examples**

Find long-running queries

.. code-block:: postgres 

    SELECT pid, usename, state, query_start, query
    FROM pg_stat_activity
    WHERE state = 'active';

**Cancel safely**

.. code-block:: postgres 

    SELECT pg_cancel_backend(12345);

**Force kill**

.. code-block:: postgres 

    SELECT pg_terminate_backend(12345);

Best practices (IMPORTANT)
    - ✅ Grant only to trusted admins
    - ✅ Prefer pg_cancel_backend over terminate
    - ✅ Log usage
    - ❌ Never grant to app roles
    - ❌ Never auto-grant in shared systems

**Relationship to other powerful roles**

.. list-table::
  :header-rows: 1

  * - Role
    - Power
  * - pg_signal_backend
    - Control sessions
  * - pg_monitor
    - Observe only
  * - pg_read_server_files
    - Read OS files
  * - pg_execute_server_program
    - Run OS commands

**pg_signal_backend is safer than file or exec roles**, but still powerful.

--------------------
Cloud environments
--------------------

Cloud providers:
	- Allow this role
	- Often restrict superuser
	- Expect this role for admin-level control

Used heavily in:
	- AWS RDS
	- GCP Cloud SQL
	- Azure PostgreSQL

**Grant / Revoke**

.. code-block:: postgres 

    GRANT pg_signal_backend TO dba_user;

Revoke:

.. code-block:: postgres 

    REVOKE pg_signal_backend FROM dba_user;

**Summary**

.. list-table::
    :header-rows: 1

    * - Feature
      - Value
    * - Access data
      - ❌
    * - Control sessions
      - ✅
    * - Kill queries
      - ✅
    * - Kill sessions
      - ✅
    * - Risk level
      - 🔴 Medium–High









