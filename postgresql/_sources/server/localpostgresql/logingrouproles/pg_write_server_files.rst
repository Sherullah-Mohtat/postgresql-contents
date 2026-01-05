pg_write_server_files
========================

---------------------------------
What is pg_write_server_files?
---------------------------------

pg_write_server_files allows a role to write files directly on the PostgreSQL server’s filesystem.

In simple words:
    “I can make PostgreSQL write files anywhere the server OS allows.”

This role crosses the boundary between:
	- Database security
	- Operating system security

-----------------------
What this role ALLOWS
-----------------------

A role with pg_write_server_files can:

📁 Write files on the DB server
	- Create files
	- Overwrite files
	- Append to files

Using SQL functions like:

.. code-block:: postgres 

    COPY table TO '/path/file.csv';
    COPY (SELECT ...) TO '/path/file.txt';

The file path is on **the PostgreSQL server machine,** not your laptop.

-------------------------
What it does NOT allow
-------------------------

.. list-table::
  :header-rows: 1

  * - Capability
    - Allowed
  * - Read server files
    - ❌ (pg_read_server_files)
  * - Execute OS commands
    - ❌ (pg_execute_server_program)
  * - Become superuser
    - ❌

But **write access alone is enough to be catastrophic.**

---------------------------------------
Why this role is extremely dangerous
---------------------------------------

**1. Overwrite critical files**

If PostgreSQL runs as a privileged OS user:

.. code-block:: postgres 

    COPY mydata TO '/etc/passwd';

→ can **corrupt system files** (depends on OS permissions).

2. Drop malicious files
	- Write cron jobs
	- Write shell scripts
	- Write config overrides

If combined with:
	- pg_execute_server_program
	- Weak OS permissions

**Full server takeover**

3. Bypass DB backups & audits
	- Write data outside DB
	- Leak data to hidden files
	- Silent exfiltration

Example (what it enables)

.. code-block:: postgres 

    COPY (
      SELECT username, password_hash
      FROM users
    ) TO '/tmp/stolen_credentials.csv';

Now the file exists **on the server,** outside DB controls.

-----------------------------
🔐 Security classification
-----------------------------

.. list-table::
    :header-rows: 1

    * - Level
      - Description
    * - Risk
      - ☠️ CRITICAL
    * - Production use
      - ❌ NEVER
    * - App roles
      - ❌ ABSOLUTELY NOT
    * - DBA emergency
      - ⚠️ VERY RARE

------------------------------
Relation to other file roles
------------------------------

.. list-table::
    :header-rows: 1

    * - Role
      - Capability
    * - pg_read_server_files
      - Read OS files
    * - pg_write_server_files
      - Write OS files
    * - pg_execute_server_program
      - Run OS commands
    * - superuser
      - All of the above

**Any two together = instant compromise**

----------------------------
Best practices (IMPORTANT)
----------------------------

❌ Never grant this:

.. code-block:: postgres 

    GRANT pg_write_server_files TO app_user;

✅ Instead:
	- Export data via:
	- pg_dump
	- COPY TO STDOUT
	- Use application-level file handling
	- Use controlled ETL pipelines

**Grant / Revoke**

.. code-block:: postgres 

    GRANT pg_write_server_files TO some_user;

Revoke immediately:

.. code-block:: postgres 

    REVOKE pg_write_server_files FROM some_user;

**Mental model**

**Database roles should NEVER touch the OS.**

The moment they do:
	- DB ≠ DB anymore
	- DB = OS entry point

**Summary**

.. list-table::
    :header-rows: 1

    * - Feature
      - Value
    * - Write OS files
      - ✅
    * - Break server security
      - ✅
    * - Safe for apps
      - ❌
    * - Safe for prod
      - 🚫
    * - Risk level
      - ☠️ MAXIMUM

**Big-picture takeaway**

If you ever see:

.. code-block:: bash 

    pg_write_server_files

Think:
    “If this is compromised, the whole server is compromised.”
