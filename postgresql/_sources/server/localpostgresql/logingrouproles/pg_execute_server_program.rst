pg_execute_server_program
==========================

-----------------------------------
What is pg_execute_server_program?
-----------------------------------

This is a **built-in privileged role** provided by PostgreSQL.

**pg_execute_server_program allows a role to execute programs on the PostgreSQL server’s operating system.**

Not SQL programs.

Not database functions.

**Actual OS-level commands.**

=====================================================================================================================

Plain English Meaning

If a user has this role, PostgreSQL can:
	- Run shell commands
	- Execute binaries
	- Interact with the server’s filesystem
	- Call external programs

⚠️ **This means server-level access, not just database access.**

=====================================================================================================================

**How is it used?**

It is mainly used with:

1️⃣ COPY ... TO/FROM PROGRAM

Example:

.. code-block:: postgres 

    COPY mytable TO PROGRAM 'gzip > /tmp/mytable.gz';

Or: 

.. code-block:: postgres 

    COPY mytable FROM PROGRAM 'curl http://example.com/data.csv';

**Only roles with pg_execute_server_program can do this**

2️⃣ Some extensions or admin tooling
	- Backup automation
	- Controlled ETL pipelines
	- Advanced admin tasks (very rare)

=====================================================================================================================

---------------------------------
Why is this role so restricted?
---------------------------------

Because it is **equivalent to OS command execution.**

If misused, a user could:
	- Read /etc/passwd
	- Write files to disk
	- Call curl, wget, rm, etc.
	- Exfiltrate data
	- Destroy the server

In cloud environments, this is often **blocked entirely.**

🚫 Default behavior
	- ❌ Not granted to normal users
	- ❌ Not granted to application roles
	- ❌ Not for web apps
	- ❌ Not for ORMs (Django, SQLAlchemy, etc.)

Only **superusers** or **trusted DBAs** should ever have it.

=====================================================================================================================

**Compare with related roles**

.. list-table::
    :header-rows: 1

    * - Role
      - What it allows
    * - pg_read_server_files
      - Read files from server
    * - pg_write_server_files
      - Write files to server
    * - pg_execute_server_program
      - Execute OS commands
    * - pg_read_all_data
      - Read all tables
    * - pg_write_all_data
      - Write all tables

**This is the most dangerous of them all**


**Example (What NOT to do)**

.. code-block:: postgres 

    GRANT pg_execute_server_program TO sherullahmohtat;

❌ Do not do this on production

❌ Do not do this for apps

❌ Do not do this unless you fully trust the user

✅ When is it actually appropriate?

Only in cases like:
    - ✔ Dedicated DBA account
    - ✔ Offline data migration machine
    - ✔ Controlled internal tooling
    - ✔ Isolated test environment
    - ✔ Air-gapped system

Even then → **audit everything**

=====================================================================================================================

--------------------------------------
🔐 PostgreSQL Security Model Insight
--------------------------------------

PostgreSQL separates:
	- SQL permissions
	- Filesystem access
	- OS execution

pg_execute_server_program **breaks the sandbox.**

That’s why PostgreSQL keeps it **explicit and visible** in pgAdmin.

**Mental Model (Remember this)**

    **Giving pg_execute_server_program is like giving sudo to PostgreSQL.**

If PostgreSQL can run it → **it runs as the postgres OS user.**


✅ Best Practice (Recommended)

For most systems:
	- ❌ Never use pg_execute_server_program
	- ✅ Use application-level ETL (Python, Spark, Airflow)
	- ✅ Use COPY TO STDOUT instead
	- ✅ Use database-safe imports

Summary
	- pg_execute_server_program = **OS command execution**
	- Extremely powerful
	- Extremely dangerous
	- Almost never needed
	- Should be granted **only by experts**


