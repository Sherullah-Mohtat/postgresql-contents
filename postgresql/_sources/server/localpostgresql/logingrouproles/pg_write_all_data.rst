pg_write_all_data
==================

----------------------------
What is pg_write_all_data?
----------------------------

pg_write_all_data allows a role to write (INSERT, UPDATE, DELETE, TRUNCATE) to ALL tables in ALL schemas in a database — without owning them.

In plain words:
    “I can modify every table’s data, even if it’s not mine.”

This is **one of the most powerful non-superuser roles** in PostgreSQL.

------------------------
What this role ALLOWS
------------------------

A role with pg_write_all_data can:

Data modification (EVERYWHERE)
	- INSERT into any table
	- UPDATE any row
	- DELETE any row
	- TRUNCATE any table

Across:
	- All schemas
	- All tables
	- All databases it can connect to

Even if:
	- The table owner is different
	- Explicit privileges were never granted

-------------------------
What it does NOT allow
-------------------------

.. list-table::
    :header-rows: 1

    * - Capability
      - Allowed
    * - Read table data
      - ❌ (needs pg_read_all_data)
    * - Change table structure
      - ❌
    * - Drop tables
      - ❌
    * - Execute OS commands
      - ❌
    * - Read/write server files
      - ❌

This role is **write-only**, not read or admin.

**Mental model**

pg_write_all_data = **“Universal data editor”**

Think:
	- Global UPDATE access
	- Global DELETE access
	- Data corruption potential

----------------------------
Why this role is dangerous
----------------------------

Accidental damage

.. code-block:: postgres 

    DELETE FROM orders;

→ wipes **all orders,** even if you don’t own the table.

Bypasses permission design
	- Ignores schema-based isolation
	- Breaks multi-tenant safety if misused

Audit nightmare
	- Hard to track which app/user modified what

-------------------
🔐 Security level
-------------------

🔴 HIGH RISK

.. list-table::
    :header-rows: 1

    * - Environment
      - Recommendation
    * - Production
      - ❌ Avoid
    * - Development
      - ⚠️ Temporary only
    * - Debugging
      - ⚠️ Short-lived
    * - Admin tasks
      - ❌ Prefer ownership

--------------------------------
Real-world usage (VERY LIMITED)
--------------------------------

Sometimes used for:
	- Emergency data correction
	- DBA hotfix scripts
	- Data migration tools (short-lived)

Never for:
	- App users
	- API services
	- Background workers
	- BI tools

**Relationship with other roles**

.. list-table::
    :header-rows: 1

    * - Role
      - Capability
    * - pg_read_all_data
      - Read everything
    * - pg_write_all_data
      - Write everything
    * - pg_monitor
      - Observe
    * - superuser
      - Everything

**Read + Write = almost superuser-level damage potential**

Example

.. code-block:: postgres 

    UPDATE customers SET balance = 0;

Even if:
	- You didn’t create the table
	- You weren’t granted privileges
	- Schema is locked down

Best practice (IMPORTANT)

❌ Do NOT do this

.. code-block:: postgres 

    GRANT pg_write_all_data TO app_user;

✅ Do this instead

.. code-block:: postgres 

    GRANT INSERT, UPDATE, DELETE
    ON ALL TABLES IN SCHEMA public
    TO app_user;

Or even better:
	- Use schema ownership
	- Use role-based schema isolation
	- Use migrations for changes

**Grant / Revoke**

.. code-block:: postgres 

    GRANT pg_write_all_data TO dangerous_user;

Revoke immediately after use:

.. code-block:: postgres 

    REVOKE pg_write_all_data FROM dangerous_user;

**Summary**

.. list-table::
    :header-rows: 1

    * - Feature
      - Value
    * - Write any table
      - ✅
    * - Bypass ownership
      - ✅
    * - Safe for apps
      - ❌
    * - Production use
      - 🚫
    * - Risk level
      - 🔴 VERY HIGH

Big picture (critical insight)

pg_write_all_data **destroys the principle of least privilege.**

If you’re designing:
	- Multi-tenant systems
	- Enterprise schemas
	- Secure APIs

**Never use this role**











