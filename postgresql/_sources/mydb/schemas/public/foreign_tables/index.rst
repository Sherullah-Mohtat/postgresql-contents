|foreign_tables| Foreign Tables
=================================

.. |foreign_tables| image:: /_static/images/sidebar_icons/foreign_tables.png

---------------------------
What is a Foreign Table?
---------------------------

A **foreign table** lets PostgreSQL **query data that lives outside the database** as if it were a normal table.
	- Data is **not stored locally**
	- PostgreSQL acts as a **client**
	- The external system is the **server**

This feature is called **FDW (Foreign Data Wrapper).**

===========================================================================================================================

**Mental model**

.. code-block:: bash 

    SELECT * FROM foreign_table;
            ↓
    PostgreSQL FDW
            ↓
    Remote DB / File / API

To SQL, it looks like a table.

Behind the scenes, PostgreSQL forwards the query.

===========================================================================================================================

Common use cases
	- Query another PostgreSQL database
	- Join local tables with remote tables
	- Read CSV / files as tables
	- Connect to MySQL, Oracle, MongoDB, etc.
	- Data federation (single query across systems)

**Core components**

1️⃣ Foreign Data Wrapper (FDW)

The **driver.**

Examples:
	- postgres_fdw → PostgreSQL → PostgreSQL
	- file_fdw → files (CSV, text)
	- mysql_fdw, oracle_fdw, etc.

.. code-block:: postgres 

    CREATE EXTENSION postgres_fdw;

===========================================================================================================================

2️⃣ Foreign Server

Connection details for the remote system.

.. code-block:: postgres 

    CREATE SERVER remote_pg
    FOREIGN DATA WRAPPER postgres_fdw
    OPTIONS (host 'localhost', dbname 'otherdb', port '5432');

===========================================================================================================================

3️⃣ User Mapping

Maps **local user → remote credentials.**

.. code-block:: postgres 

    CREATE USER MAPPING FOR current_user
    SERVER remote_pg
    OPTIONS (user 'remote_user', password 'secret');

===========================================================================================================================

4️⃣ Foreign Table

The **table definition** PostgreSQL uses locally.

.. code-block:: postgres 

    CREATE FOREIGN TABLE remote_orders (
        id     integer,
        total  numeric
    )
    SERVER remote_pg
    OPTIONS (schema_name 'public', table_name 'orders');

Now you can:

.. code-block:: postgres 

    SELECT * FROM remote_orders;

===========================================================================================================================

-----------------------------------------------
How Foreign Tables differ from normal tables
-----------------------------------------------

.. list-table::
    :header-rows: 1

    * - Feature
      - Normal Table
      - Foreign Table
    * - Data stored locally
      - ✅
      - ❌
    * - Supports indexes
      - ✅
      - ❌ (remote decides)
    * - INSERT/UPDATE
      - ✅
      - Depends on FDW
    * - Joins
      - ✅
      - ✅
    * - Transactions
      - Full
      - Limited
    * - Performance
      - Fast
      - Network-bound

===========================================================================================================================

**What pgAdmin shows under “Foreign Tables”**

When you expand Schemas → public → Foreign Tables, pgAdmin is showing:
	- Table definitions
	- Column metadata
	- Mappings to a remote source

The data is **never copied** unless you explicitly do so.

===========================================================================================================================

Performance considerations (important)
	- Each query may trigger remote calls
	- Filters (WHERE) may or may not be pushed down
	- Joins across foreign + local tables can be expensive

Best practice:
	- Filter early
	- Limit columns
	- Avoid large joins across boundaries

===========================================================================================================================

--------------------------------------
Foreign Tables vs Materialized Views
--------------------------------------

.. list-table::
    :header-rows: 1

    * - Use
      - Choose
    * - Always fresh data
      - Foreign Table
    * - Faster queries
      - Materialized View
    * - Offline access
      - Materialized View
    * - Cross-DB joins
      - Foreign Table

===========================================================================================================================

Summary:
    A foreign table lets PostgreSQL treat external data sources like local tables without storing the data.












