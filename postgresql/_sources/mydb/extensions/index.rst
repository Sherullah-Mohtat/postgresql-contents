Extensions 
===========

-------------------------
PostgreSQL Extensions
-------------------------
.. code-block:: bash 

    Extensions (1)
    └── plpgsql

This means **one extension is installed in this database.**

================================================================================================================

------------------------------------
1️⃣ What is a PostgreSQL Extension?
------------------------------------

A PostgreSQL extension is a packaged feature that can add:
	- New **functions**
	- New **data types**
	- New **operators**
	- New **index types**
	- New **procedural languages**
	- New **SQL capabilities**

Think of extensions as plug-ins for PostgreSQL.

PostgreSQL itself is very small and clean at the core.
Most powerful features come via extensions.

================================================================================================================

----------------------------
2️⃣ Why Extensions Exist 
----------------------------

Without extensions, PostgreSQL would only support:
	- Basic SQL
	- Basic data types
	- Core query engine

Extensions allow PostgreSQL to become:
	- Spatial database (PostGIS)
	- Time-series database (TimescaleDB)
	- Full-text search engine
	- Procedural programming platform
	- Analytics engine

================================================================================================================

--------------------------------------
3️⃣ Why pgAdmin shows “Extensions (1)”
--------------------------------------

pgAdmin shows **how many extensions are installed in the current database.**

In your case:

.. code-block:: bash 

    Extensions (1)

Means:
	- Only **one extension** is installed
	- That extension is **plpgsql**

================================================================================================================

--------------------------------
4️⃣ What is plpgsql Extension?
--------------------------------

**plpgsql = PostgreSQL Procedural Language**

plpgsql allows you to write:
	- Functions
	- Triggers
	- Event triggers
	- Procedures

Using:
	- Variables
	- Loops
	- Conditions (IF, CASE)
	- Exception handling

Example:

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION add_numbers(a int, b int)
    RETURNS int
    LANGUAGE plpgsql
    AS $$
    BEGIN
        RETURN a + b;
    END;
    $$;

Without plpgsql, **this would be impossible.**

================================================================================================================

------------------------
5️⃣ Is plpgsql special?
------------------------

Yes — very special.
	- plpgsql is **installed by default** in almost all PostgreSQL databases
	- It is considered a **trusted language**
	- PostgreSQL uses it internally for many features

That’s why you see it even in a fresh database.

================================================================================================================

------------------------------------
6️⃣ Extensions are Database-Level
------------------------------------

Extensions are:
	- ✅ Installed **per database**
	- ❌ Not global across all databases

That’s why you see:

.. code-block:: bash 

    Databases
    ├── postgres
    ├── MyDB
    └── test_db

Each database can have **different extensions installed.**

================================================================================================================

-----------------------------------
7️⃣ How Extensions Work Internally
-----------------------------------

When you run:

.. code-block:: postgres 

    CREATE EXTENSION plpgsql;

PostgreSQL does:
	1.	Reads extension files from:

.. code-block:: bash 

    $PGHOME/share/extension/

2.	Creates system objects:
	- Functions
	- Types
	- Operators

3.	Registers metadata in pg_extension

You can see them using:

.. code-block:: postgres 

    SELECT * FROM pg_extension;

================================================================================================================

---------------------------------------
8️⃣ Common PostgreSQL Extensions 
---------------------------------------

.. list-table::
    :header-rows: 1

    * - Extension
      - Purpose
    * - plpgsql
      - Procedural language
    * - postgis
      - GIS / spatial data
    * - pg_stat_statements
      - Query performance analysis
    * - citext
      - Case-insensitive text
    * - hstore
      - Key-value storage
    * - uuid-ossp
      - UUID generation
    * - pgcrypto
      - Cryptography
    * - timescaledb
      - Time-series data
    * - unaccent
      - Text normalization

================================================================================================================

--------------------------------
9️⃣ How to Install an Extension
--------------------------------

Using SQL

.. code-block:: postgres 

    CREATE EXTENSION pgcrypto;

Using pgAdmin
	1.	Right-click **Extensions**

	2.	Click **Create → Extension**

	3.	Select extension

	4.	Save

================================================================================================================

🔒 Security Note
	- Some extensions are **trusted** (safe for users)
	- Some extensions are **untrusted**
	- Installing extensions usually requires **superuser or elevated privileges**



