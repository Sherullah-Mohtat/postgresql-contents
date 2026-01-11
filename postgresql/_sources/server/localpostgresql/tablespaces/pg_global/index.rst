|pg_global| pg_global 
=======================

.. |pg_global| image:: /_static/images/sidebar_icons/pg_default.png

-----------------------------------
What is pg_global in PostgreSQL?
-----------------------------------

pg_global is a special PostgreSQL tablespace that stores cluster-wide system metadata shared by all databases in the server.

    In short: **pg_global stores PostgreSQL’s brain — not your data.**

pg_global is the PostgreSQL system tablespace that contains global catalog tables shared across all databases in a PostgreSQL cluster.

============================================================================================================================================

-------------------------
📂 Where pg_global Lives
-------------------------

On disk:

.. code-block:: bash 

    $PGDATA/global/

This directory is **outside individual databases.**

Unlike pg_default, it is:
	- Not per-database
	- Shared across the entire cluster

============================================================================================================================================

------------------------------
What is Stored in pg_global?
------------------------------

pg_global contains **cluster-wide system catalogs**, including:

Authentication & Roles
	- Users (roles)
	- Password hashes
	- Role privileges

Database Metadata
	- List of all databases
	- Database ownership
	- Encoding, locale info

Tablespaces
	- Tablespace definitions
	- Physical paths

Replication & Slots
	- Replication slots
	- Subscription metadata

🔐 Security Objects
	- Access control lists
	- Shared dependencies

============================================================================================================================================

---------------------------
Key System Catalog Tables
---------------------------

.. list-table::
    :header-rows: 1

    * - Catalog
      - Purpose
    * - pg_database
      - List of all databases
    * - pg_authid
      - Roles & passwords
    * - pg_tablespace
      - Tablespace info
    * - pg_shdepend
      - Shared dependencies

These live **physically in pg_global.**

============================================================================================================================================

🚫 What is NOT Stored in pg_global
    - ❌ User tables
    - ❌ Indexes
    - ❌ Application data
    - ❌ Schemas
    - ❌ Views

Those belong in **pg_default or custom tablespaces.**

============================================================================================================================================

⚠️ Why pg_global Is Untouchable
	- Required for PostgreSQL startup
	- Shared by all databases
	- Corruption = server won’t start
	- Cannot be dropped
	- Cannot be moved

If pg_global is damaged, **all databases are affected.**

============================================================================================================================================

-------------------------
pg_default vs pg_global
-------------------------

.. list-table::
    :header-rows: 1

    * - Feature
      - pg_default
      - pg_global
    * - Scope
      - Per database
      - Cluster-wide
    * - Stores user data
      - ✅
      - ❌
    * - Stores system catalogs
      - ❌
      - ✅
    * - Safe to use manually
      - ✅
      - 🚫
    * - Can be customized
      - ✅
      - ❌

============================================================================================================================================

-------------------
Real-World Analogy
-------------------

Think of PostgreSQL as a company:

.. list-table:: 
    :header-rows: 1

    * - PostgreSQL
      - Company
    * - pg_global
      - HR + Admin office
    * - pg_default
      - Department offices
    * - Databases
      - Departments
    * - Tables
      - Files

You never edit HR records directly — same with pg_global.

============================================================================================================================================

------------------------------
Why pgAdmin Shows pg_global
------------------------------

pgAdmin shows it so you:
	- Understand cluster structure
	- Can inspect (read-only)
	- Don’t accidentally misuse it

**Viewing is safe. Editing is not.**


-------------------
Backup Importance
-------------------

Every full PostgreSQL backup must include pg_global.

Example:

.. code-block:: bash 

    pg_dumpall --globals-only > globals.sql

This backs up:
	- Roles
	- Tablespaces
	- Global privileges

---------
Summary
---------

.. note::
    
    pg_global is PostgreSQL’s system tablespace that stores global metadata shared across all databases, including roles, databases, tablespaces, and security information. It is essential for server operation and should never be modified manually.

