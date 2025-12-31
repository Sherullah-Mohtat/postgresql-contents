Catalogs 
=========

----------------------------------
What are Catalogs in PostgreSQL?
----------------------------------

**Catalogs** are **system schemas** that store **metadata about the database itself.**

    Metadata = data **about** data

They tell PostgreSQL:
	- What tables exist
	- What columns they have
	- What types, indexes, users, permissions, functions, etc. exist

You **do not store your application data here**

PostgreSQL **uses catalogs internally to work**

=================================================================================================================

--------------------------------------
Why does pgAdmin show Catalogs (2)?
--------------------------------------

Because PostgreSQL exposes **two main catalog schemas** in every database:

1️⃣ **ANSI (information_schema)**

2️⃣ **PostgreSQL Catalog (pg_catalog)**

=================================================================================================================

1️⃣ ANSI Catalog — information_schema
--------------------------------------

What it is
	- A **standard SQL schema**
	- Defined by **ANSI / ISO SQL standard**
	- Works similarly across:
	- PostgreSQL
	- MySQL
	- SQL Server
	- Oracle

Purpose:

Portable, safe, standard way to inspect database structure

================================================================================================================

**What it contains**

Views like:
	- information_schema.tables
	- information_schema.columns
	- information_schema.schemata
	- information_schema.views

================================================================================================================

**Example (safe & recommended)**

.. code-block:: sql

    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public';

✔ Portable

✔ Stable

✔ Preferred for apps, tools, reports

================================================================================================================

When to use information_schema
	- Writing **cross-database tools**
	- Reporting
	- Teaching SQL
	- Safer introspection

================================================================================================================

2️⃣ PostgreSQL Catalog — pg_catalog
-----------------------------------

What it is
	- PostgreSQL’s internal system catalog
	- PostgreSQL-specific
	- More detailed and powerful

Purpose:

How PostgreSQL **really knows everything**

================================================================================================================

**What it contains**

System tables like:
	- pg_database
	- pg_class
	- pg_attribute
	- pg_type
	- pg_index
	- pg_proc
	- pg_roles

These are **real tables**, not just views.

================================================================================================================

**Example**

.. code-block:: sql

    SELECT datname
    FROM pg_database;

.. code-block:: sql 

    SELECT relname
    FROM pg_class
    WHERE relkind = 'r';

✔ Very powerful

❌ PostgreSQL-only

❌ Internal structure may change between versions

================================================================================================================

When to use pg_catalog
	- Deep database introspection
	- DBA tasks
	- Performance tuning
	- Extensions
	- Advanced tooling

================================================================================================================

**Key Differences**

.. list-table::
    :header-rows: 1

    * - Feature
      - information_schema
      - pg_catalog
    * - Standard
      - ✅ ANSI SQL
      - ❌ PostgreSQL-only
    * - Portability
      - ✅ High
      - ❌ Low
    * - Detail level
      - Medium
      - Very high
    * - Stability
      - Very stable
      - Internal
    * - Recommended for apps
      - ✅ Yes
      - ⚠️ Advanced only
    
================================================================================================================

**Important Rule ⚠️**

❌ Never modify catalog tables directly

PostgreSQL manages them automatically.

You:
	- Query them ✔
	- Read metadata ✔
	- Learn from them ✔

================================================================================================================

**How pgAdmin uses Catalogs**

pgAdmin:
	- Reads information_schema for structure
	- Reads pg_catalog for deep info
	- Combines both to draw the UI tree you see

================================================================================================================

Summary
	- Catalogs = metadata storage
	- information_schema → standard, safe, portable
	- pg_catalog → internal, powerful, PostgreSQL-specific
	- Every database has both
	- Your data never goes here
    