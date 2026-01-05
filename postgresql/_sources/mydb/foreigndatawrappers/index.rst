Foreign Data Wrappers
======================

----------------------------------------
PostgreSQL Foreign Data Wrappers (FDW)
----------------------------------------

In your pgAdmin tree you see:

.. code-block:: bash 

    MyDB
    |___ Casts
    |___ Catalogs 
    |___ Event Triggers
    |___ Extensions 
    |___ Foreign Data Wrappers 
    |___ Languages
    |___ Publications 
    |___ Schemas 
    |___ Subscriptions

This means PostgreSQL is ready to **connect to external data sources** as if they were local tables.

===========================================================================================================

-----------------------------------
1️ What is a Foreign Data Wrapper?
-----------------------------------

A Foreign Data Wrapper (FDW) allows PostgreSQL to:

    Access data stored outside the current database using normal SQL queries.

PostgreSQL becomes a **data gateway**, not just a database.

.. note::

    A data gateway is a system that allows applications to access and query data from multiple external sources through a single interface. In PostgreSQL, Foreign Data Wrappers (FDW) enable PostgreSQL to act as a data gateway.

===========================================================================================================

-------------------
2️ Why FDW Exists 
-------------------

Normally, PostgreSQL can only query:
	- Tables inside the same database

With FDW, PostgreSQL can query:
	- Other PostgreSQL databases
	- MySQL
	- Oracle
	- MongoDB
	- CSV files
	- REST APIs (via custom FDWs)
	- Even another server on another machine

All using **SELECT, JOIN, WHERE**, etc.

===========================================================================================================

-----------------------
3️ FDW in Simple Words
-----------------------

FDW = **“Query external data as if it were local”**

===========================================================================================================

-----------------------
4️ Core FDW Components
-----------------------

FDW is not a single thing. It has **four layers:**

1. Foreign Data Wrapper
------------------------

Defines how to talk to an external source.

Example:

.. code-block:: postgres

    CREATE EXTENSION postgres_fdw;

2. Foreign Server
-------------------

Connection details to the external system

.. code-block:: postgres

    CREATE SERVER remote_pg
    FOREIGN DATA WRAPPER postgres_fdw
    OPTIONS (host 'localhost', dbname 'otherdb', port '5432');

3. User Mapping
-----------------

Authentication credentials.

.. code-block:: postgres

    CREATE USER MAPPING FOR current_user
    SERVER remote_pg
    OPTIONS (user 'remote_user', password 'secret');

4. Foreign Table
-----------------

A local definition pointing to remote data.

.. code-block:: postgres 

    CREATE FOREIGN TABLE users_remote (
        id int,
        name text
    )
    SERVER remote_pg
    OPTIONS (schema_name 'public', table_name 'users');

===========================================================================================================

----------------------------------------------------
5️ What pgAdmin Shows Under “Foreign Data Wrappers”
----------------------------------------------------

Once configured, pgAdmin will show:
	- FDW extensions (e.g., postgres_fdw)
	- Foreign servers
	- Foreign tables

They look **almost like normal tables** — but they are not stored locally.

===========================================================================================================

----------------------------------
6️ Most Common FDWs in PostgreSQL
----------------------------------

.. list-table::
    :header-rows: 1

    * - FDW
      - Purpose
    * - postgres_fdw
      - Connect to another PostgreSQL
    * - mysql_fdw
      - Connect to MySQL
    * - oracle_fdw
      - Connect to Oracle
    * - mongo_fdw
      - Connect to MongoDB
    * - file_fdw
      - Read CSV / flat files
    * - tds_fdw
      - SQL Server
    * - jdbc_fdw
      - JDBC sources

===========================================================================================================

------------------------------
7️ FDW vs Logical Replication
------------------------------

.. list-table::
    :header-rows: 1

    * - Feature
      - FDW
      - Replication
    * - Live access
      - ✅ Yes
      - ❌ No
    * - Data copied
      - ❌ No
      - ✅ Yes
    * - Joins across DBs
      - ✅ Yes
      - ❌ No
    * - Performance
      - Slower
      - Faster
    * - Use case
      - Read/Query
      - Sync/Backup

===========================================================================================================

---------------------------------
8️ Performance & Safety Notes ⚠️
---------------------------------

	- FDW queries are **slower** than local tables
	- Network latency matters
	- Indexes may not be pushed down
	- Permissions must be handled carefully

FDW is best for:
	- Reporting
	- Analytics
	- Read-heavy workloads
	- Cross-system queries

===========================================================================================================

**🔒 Security Model**

FDW respects:
	- PostgreSQL roles
	- User mappings
	- Schema permissions

But:
	- Passwords are stored in metadata
	- Superuser is usually required to set it up

===========================================================================================================

-----------------------------------------------------
9️ Minimal Working FDW Example (Postgres → Postgres)
-----------------------------------------------------

.. code-block:: postgres 

    CREATE EXTENSION postgres_fdw;

    CREATE SERVER other_db
    FOREIGN DATA WRAPPER postgres_fdw
    OPTIONS (host 'localhost', dbname 'test', port '5432');

    CREATE USER MAPPING FOR CURRENT_USER
    SERVER other_db
    OPTIONS (user 'postgres', password 'password');

    IMPORT FOREIGN SCHEMA public
    FROM SERVER other_db
    INTO public;

