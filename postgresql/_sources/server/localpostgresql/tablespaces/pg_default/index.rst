pg_default 
===========

.. code-block::

    Tablespaces
    ├── pg_default
    └── pg_global

-----------------------------------
What is pg_default in PostgreSQL?
-----------------------------------

pg_default is the built-in PostgreSQL tablespace that stores tables, indexes, and other database objects when no custom tablespace is specified.

pg_default is the default tablespace used by PostgreSQL to store database objects unless another tablespace is explicitly specified.

    In simple words: pg_default is where PostgreSQL stores your data by default.

--------------------------------------
📂 Where pg_default Physically Lives
--------------------------------------

On disk, pg_default points to:

.. code-block:: 

    $PGDATA/base/

This directory contains:
	- Database directories (by OID)
	- Tables
	- Index files
	- TOAST data

So when you create a table **without mentioning tablespace**, it goes here.

=========================================================================================================================================================

------------------------------
Objects Stored in pg_default
------------------------------

Unless overridden, all of these go into pg_default:
	- Tables
	- Indexes
	- Materialized views
	- Sequences
	- TOAST tables

Example:

.. code-block:: postgres 

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT
    );

➡ Stored in **pg_default**

=========================================================================================================================================================

-----------------------
Why pg_default Exists
-----------------------

PostgreSQL needs:
	- A **guaranteed, always-available** storage location
	- A safe place during initialization
	- A fallback if no tablespace is specified

So pg_default is:
	- Created automatically
	- Required for PostgreSQL to function
	- Cannot be dropped

=========================================================================================================================================================

---------------------------------
pg_default vs Custom Tablespace
---------------------------------

.. list-table::
    :header-rows: 1

    * - Feature
      - pg_default
      - Custom Tablespace
    * - Created automatically
      - ✅
      - ❌
    * - Location
      - $PGDATA/base
      - Any directory
    * - Performance tuning
      - ❌
      - ✅
    * - Can be dropped
      - ❌
      - ❌ (if in use)
    * - Typical use
      - General data
      - Large tables, indexes

=========================================================================================================================================================

Creating Objects in pg_default Explicitly

You usually **don’t need to**, but you can:

.. code-block:: postgres 

    CREATE TABLE logs (
        id BIGSERIAL,
        message TEXT
    ) TABLESPACE pg_default;

This is the same as not specifying tablespace.

=========================================================================================================================================================

🔒 Permissions

By default:
	- Superusers can use it
	- Normal users inherit access
	- You can restrict usage (not recommended)

.. code-block:: postgres 

    REVOKE CREATE ON TABLESPACE pg_default FROM public;

⚠️ Use carefully.

=========================================================================================================================================================

--------------------
Real-World Analogy
--------------------

Think of PostgreSQL storage like a computer:

.. list-table::
    :header-rows: 1

    * - PostgreSQL
      - Computer
    * - pg_default
      - System disk (C:)
    * - Custom tablespace
      - External SSD / separate drive
    * - Tables
      - Files
    * - Indexes
      - File indexes

You can put everything on C:,

but heavy workloads benefit from separate disks.

=========================================================================================================================================================

-------------------------------------
When Should You NOT Use pg_default?
-------------------------------------

Avoid it when:
	- Very large tables (100GB+)
	- Heavy index usage
	- High-performance systems
	- Separation of data & indexes is required

Example:

.. code-block:: postgres 

    CREATE TABLE orders (...) TABLESPACE fast_ssd;
    CREATE INDEX idx_orders ON orders (...) TABLESPACE index_ssd;

=========================================================================================================================================================

----------
Summary 
----------

.. note::

    pg_default is PostgreSQL’s built-in default tablespace that stores tables, indexes, and other database objects when no custom tablespace is specified. It resides inside the PostgreSQL data directory and is essential for normal database operation.





