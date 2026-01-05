pg_read_server_files
======================

--------------------------------
What is pg_read_server_files?
--------------------------------

pg_read_server_files is a built-in role that allows reading files from the PostgreSQL server’s filesystem.

In simple words:
    “I can read files that exist on the database server machine.”

⚠️ This is **NOT** about reading table data

⚠️ This is **NOT** about reading client/local files

⚠️ This is **server-side filesystem access**

-----------------------
What this role ALLOWS
-----------------------

A role with pg_read_server_files can use functions like:

**📄Read files**

.. code-block:: bash 

    pg_read_file()
    pg_read_binary_file()

Example:

.. code-block:: postgres 

    SELECT pg_read_file('/etc/hostname');

**📂 List directories**

.. code-block:: bash 

    pg_ls_dir()

Example:

.. code-block:: postgres 

    SELECT pg_ls_dir('pg_log');

**📄Read log files**

.. code-block:: postgres 

    SELECT pg_read_file('log/postgresql-2024-01-01.log');

Typical readable targets
	- PostgreSQL log files
	- Config files (sometimes)
	- Data directory metadata
	- OS text files (if permissions allow)

**❌ What it does NOT allow**

.. list-table::
    :header-rows: 1

    * - Action
      - Allowed
    * - Read table data
      - ❌
    * - Modify files
      - ❌
    * - Write files
      - ❌
    * - Execute OS commands
      - ❌
    * - Access client filesystem
      - ❌

Writing files requires **pg_write_server_files**

Executing programs requires **pg_execute_server_program**

**Why this role is DANGEROUS**

Even though it’s “read-only”, it can expose:

Sensitive data risks
	- SSL private keys
	- Password files
	- Config secrets
	- OS user info
	- Backup locations

Example:

.. code-block:: postgres 

    SELECT pg_read_file('/var/lib/postgresql/data/postgresql.conf');

That may reveal:
	- Ports
	- Users
	- Paths
	- Extensions
	- Logging destinations

**Mental model**

pg_read_server_files = **“Read access to the database server’s hard drive”**

Not your laptop

Not the client

The **actual DB server machine**

Common legitimate use cases
    - ✔ DBAs reading logs from SQL
    - ✔ Debugging startup issues
    - ✔ Monitoring tools
    - ✔ Controlled maintenance scripts

Bad use cases (DO NOT)
    - ❌ Application users
    - ❌ Web apps
    - ❌ Shared reporting users
    - ❌ Multi-tenant SaaS users

--------------------------------
 Relationship with other roles
--------------------------------

.. list-table::
    :header-rows: 1

    * - Role
      - Capability
    * - pg_read_server_files
      - 📖 Read files
    * - pg_write_server_files
      - ✍️ Write files
    * - pg_execute_server_program
      - Run OS commands
    * - pg_monitor
      - Stats only (safe)

**Never combine these casually**

Best practices (VERY IMPORTANT)
    - ✅ Grant only to trusted DBAs
    - ✅ Use temporarily, then revoke
    - ✅ Audit usage
    - ❌ Never grant to app roles
    - ❌ Never grant in cloud/shared DBs

**Cloud note (AWS / GCP / Azure)**

Cloud providers often:
	- Restrict file paths
	- Block access to sensitive OS files
	- Log usage heavily

Still **dangerous if misused.**

**Example grant**

.. code-block:: postgres 

    GRANT pg_read_server_files TO dba_user;

To revoke:

.. code-block:: postgres 

    REVOKE pg_read_server_files FROM dba_user;

**Summary**

.. list-table::
    :header-rows: 1

    * - Feature
      - Value
    * - Access level
      - 🔴 High
    * - Reads server files
      - ✅
    * - Writes server files
      - ❌
    * - Executes OS commands
      - ❌
    * - Safe for apps
      - ❌


