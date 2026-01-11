|pg_groups| pg_read_all_data
==============================

.. |pg_groups| image:: /_static/images/sidebar_icons/pg_groups.png

--------------------------
What is pg_read_all_data?
--------------------------

pg_read_all_data is a built-in role that allows reading all table and view data in the database — across all schemas.

Think of it as:

    👀 Read everything, change nothing

-----------------------------
What pg_read_all_data CAN do
-----------------------------

A role with pg_read_all_data can:

Read all user data
	- SELECT * FROM any_table
	- Across all schemas
	- Regardless of table ownership

Read views & materialized views
	- Normal views
	- Materialized views

Bypass per-table GRANTs

Even if a table has:

.. code-block:: postgres 

    REVOKE ALL ON table_x FROM PUBLIC;

pg_read_all_data can still read it.

=================================================================================================================================

---------------------------------
What pg_read_all_data CANNOT do
---------------------------------
	- ❌ INSERT
	- ❌ UPDATE
	- ❌ DELETE
	- ❌ TRUNCATE
	- ❌ CREATE / DROP objects
	- ❌ Modify schema
	- ❌ Execute OS commands
	- ❌ Access server files

So it is **NOT dangerous to data integrity,** but **very sensitive for confidentiality.**

-------------------
🔐 Security Impact
-------------------

.. list-table::
    :header-rows: 1

    * - Aspect
      - Risk
    * - Data integrity
      - 🟢 Safe
    * - Data confidentiality
      - 🔴 High risk
    * - Schema safety
      - 🟢 Safe
    * - OS security
      - 🟢 Safe

⚠️ Anyone with this role can read **password hashes, PII**, **financial data,** etc.

=================================================================================================================================

------------------------
How it works internally
------------------------

pg_read_all_data automatically grants:
	- SELECT on all tables
	- USAGE on all schemas
	- Access to system catalogs related to data

It does **not** give write permissions.

Example

Without pg_read_all_data

.. code-block:: postgres 

    SELECT * FROM payroll.salaries;
    -- ERROR: permission denied

With pg_read_all_data

.. code-block:: postgres 

    SELECT * FROM payroll.salaries;
    -- ✅ works


**How to grant it**

.. code-block:: postgres 

    GRANT pg_read_all_data TO analyst_user;

=================================================================================================================================

👤 Who SHOULD get pg_read_all_data

✅ Good candidates
	•	Data analysts
	•	BI / reporting users
	•	Read-only APIs
	•	Backup / export jobs
	•	Auditors (read-only)

❌ Bad candidates
	•	Application users
	•	Web backend roles
	•	Untrusted users
	•	External contractors

Comparison with related roles

.. list-table:: 
    :header-rows: 1

    * - Role
      - Meaning
    * - pg_monitor
      - 👀 See stats & activity
    * - pg_read_all_data
      - 📖 Read all data
    * - pg_write_all_data
      - ✍️ Write all data
    * - pg_database_owner
      - 🧠 Full DB control
    * - pg_execute_server_program
      - 💣 OS access

=================================================================================================================================

☁️ Cloud notes (AWS / Azure / GCP)
	- Allowed in RDS / Cloud SQL
	- Common for read replicas
	- Safe for analytics clusters
	- Used heavily in BI pipelines

🧠 Mental model

pg_read_all_data = **“I can read the whole database, but I cannot touch anything.”**

✅ Best practice
    - ✔ Use for read-only reporting
    - ✔ Pair with pg_monitor for observability
    - ❌ Never give to app users


