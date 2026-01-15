|tables| Tables
================

.. |tables| image:: /_static/images/sidebar_icons/tables.png

---------------------
Tables (PostgreSQL)
---------------------

1️⃣ What is a table?
---------------------

A **table** is a structured container that stores data in **rows and columns.**
	- **Column** → defines what kind of data can be stored
	- **Row** → one record / entry
	- **Table** → collection of related records

Example:

.. code-block:: bash 

    users
    ├── id
    ├── email
    ├── created_at

===========================================================================================================================

2️⃣ Tables live inside schemas
----------------------------------

From your tree:

.. code-block:: bash 

    MyDB
    └── Schemas
        └── public
            └── Tables

Important:
	- Tables are **not global**
	- Their full name is:

.. code-block:: postgres 

    schema_name.table_name

Example:

.. code-block:: postgres 

    public.users

===========================================================================================================================

3️⃣ Creating a table (basic)
------------------------------

.. code-block:: postgres 

    CREATE TABLE public.users (
        id BIGINT GENERATED ALWAYS AS IDENTITY,
        email TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
    );

What happened:
	- A table was created
	- A sequence was auto-created for id
	- Defaults and constraints are enforced by PostgreSQL

===========================================================================================================================

4️⃣ Columns (what you see under “Columns”)
---------------------------------------------

Each column has:
	- **Data type**
	- **NULL / NOT NULL**
	- **Default**
	- Optional constraints

Example:

.. code-block:: postgres 

    email TEXT NOT NULL

This guarantees:
	- Email must exist
	- Cannot be NULL

===========================================================================================================================

5️⃣ Constraints (data rules)
------------------------------

Under **Constraints** in pgAdmin you’ll see:

Primary Key

.. code-block:: postgres 

    PRIMARY KEY (id)

- Uniqueness
- Index-backed
- Identifies the row

===========================================================================================================================

Unique

.. code-block:: postgres 

    UNIQUE (email)

- Prevents duplicates

Check

.. code-block:: postgres 

    CHECK (length(email) > 5)

- Enforces rules on data

Foreign Key

.. code-block:: postgres 

    user_id BIGINT REFERENCES users(id)

- Ensures relational integrity

===========================================================================================================================

6️⃣ Indexes (performance)
--------------------------

Indexes speed up reads.

Example:

.. code-block:: postgres 

    CREATE INDEX idx_users_email ON users(email);

- Faster WHERE email = ...
- Slightly slower writes (normal tradeoff)

In pgAdmin:

.. code-block:: bash 

    Tables → users → Indexes

===========================================================================================================================

7️⃣ Triggers (automatic behavior)
-----------------------------------

Triggers are actions that fire:
	- BEFORE INSERT
	- AFTER UPDATE
	- BEFORE DELETE

Example:

.. code-block:: postgres 

    CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

Used for:
	- Audit fields
	- Validation
	- Business rules

===========================================================================================================================

8️⃣ Rules (advanced, rarely used)
-------------------------------------

Rules rewrite queries internally.

Example:
	- Used historically for updatable views
	- Avoid for new systems
	- Triggers are preferred

===========================================================================================================================

9️⃣ RLS Policies (Row Level Security)
-----------------------------------------

Under RLS Policies:

.. code-block:: postgres 

    ALTER TABLE users ENABLE ROW LEVEL SECURITY;

Example policy:

.. code-block:: postgres 

    CREATE POLICY user_isolation
    ON users
    USING (id = current_setting('app.user_id')::bigint);

This is production-grade security:
	- Database enforces access
	- Application cannot bypass it

===========================================================================================================================

🔟 Table ownership & permissions

Every table has:
	- Owner
	- Privileges

Example:

.. code-block:: postgres 

    GRANT SELECT, INSERT ON users TO app_role;
    REVOKE ALL ON users FROM PUBLIC;

Best practice:
	- Apps use **roles**
	- Humans use **admin roles**
	- No superuser in prod apps

===========================================================================================================================

1️⃣1️⃣ Table storage facts (important)
----------------------------------------

	- Tables are stored as heap files
	- PostgreSQL uses MVCC
	- Updates create new row versions
	- VACUUM cleans old ones

You don’t manage files — PostgreSQL does.

===========================================================================================================================

1️⃣2️⃣ Tables vs Views vs Materialized Views
----------------------------------------------

.. list-table::
    :header-rows: 1

    * - Object
      - Stores data
      - Fast reads
      - Auto updates
    * - Table
      - ✅
      - Medium
      - ✅
    * - View
      - ❌
      - Slow
      - ✅
    * - Materialized View
      - ✅
      - Fast
      - ❌ (manual refresh)

===========================================================================================================================

1️⃣3️⃣ Production table checklist
---------------------------------------

A good production table usually has:
	- Primary key
	- Proper data types
	- Constraints
	- Indexes
	- Ownership set
	- RLS (if multi-tenant or API-driven)

Summary
    A table is a schema-scoped, rule-enforced, indexed data structure that stores records safely and efficiently in PostgreSQL.








