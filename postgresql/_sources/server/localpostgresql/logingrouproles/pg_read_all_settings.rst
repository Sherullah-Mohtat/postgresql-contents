pg_read_all_settings
=====================

--------------------------------
What is pg_read_all_settings?
--------------------------------

pg_read_all_settings is a built-in role that allows a user to read all PostgreSQL configuration settings.

In simple words:
    “I can see how the server is configured.”

----------------------------------
What pg_read_all_settings CAN do
----------------------------------

A role with this privilege can:
    Read all configuration parameters

Including:
	- shared_buffers
	- work_mem
	- maintenance_work_mem
	- max_connections
	- wal_level
	- log_statement
	- ssl, ssl_ciphers
	- archive_mode
	- autovacuum_*
	- listen_addresses

From:

.. code-block:: postgres 

    SHOW ALL;

Or: 

.. code-block:: postgres 

    SELECT * FROM pg_settings;

What it CANNOT do
	- ❌ Change settings
	- ❌ Reload config
	- ❌ Restart server
	- ❌ Read data from tables
	- ❌ Access files
	- ❌ Execute OS commands

It is **read-only.**

Why this role exists

Normally:

.. code-block:: postgres 

    SELECT * FROM pg_settings;
    
returns **only non-sensitive settings**

But with pg_read_all_settings:
	- You see **everything**
	- Including hidden / sensitive parameters

Security considerations

.. list-table::
    :header-rows: 1

    * - Risk area
      - Impact
    * - Data confidentiality
      - 🟢 Safe
    * - Server topology exposure
      - 🔴 Medium
    * - Performance tuning secrets
      - 🟡 Medium
    * - OS security
      - 🟢 Safe

Examples of sensitive info exposed:
	- File paths (data_directory)
	- SSL config
	- WAL/archive paths
	- Logging policies
	- Memory limits


**Mental model**

pg_read_all_settings = **“Read the server’s brain, but don’t touch it.”**

Example

Without role

.. code-block:: postgres 

    SELECT * FROM pg_settings;
    -- some rows hidden

With role

.. code-block:: postgres 

    GRANT pg_read_all_settings TO analyst;

.. code-block:: postgres 

    SELECT name, setting FROM pg_settings;
    -- full list visible

=======================================================================================================================

Typical users for this role

✅ Good candidates
	- DBAs (read-only)
	- Performance engineers
	- Observability tools
	- Monitoring agents
	- Infrastructure auditors

❌ Bad candidates
	- Application users
	- External customers
	- BI users (usually unnecessary)

How it fits with other roles

.. list-table::
    :header-rows: 1

    * - Role
      - Purpose
    * - pg_read_all_settings
      - ⚙️ Read config
    * - pg_read_all_stats
      - 📊 Read stats
    * - pg_monitor
      - 👀 Combined observability
    * - pg_read_all_data
      - 📖 Read data
    * - pg_write_all_data
      - ✍️ Write data

.. note::

    pg_monitor already includes pg_read_all_settings.

======================================================================================================================

☁️ Cloud behavior (AWS RDS / Cloud SQL)
	- Fully supported
	- Does **not** expose host OS
	- Safe for monitoring stacks (Prometheus, Datadog, etc.)

Best practice
    - ✔ Grant to monitoring roles
    - ✔ Combine with pg_read_all_stats
    - ❌ Don’t grant to app roles


Summary

.. list-table::
    :header-rows: 1

    * - Feature
      - Allowed
    * - Read pg_settings
      - ✅
    * - SHOW ALL
      - ✅
    * - Modify settings
      - ❌
    * - Restart server
      - ❌
    * - Access data
      - ❌
