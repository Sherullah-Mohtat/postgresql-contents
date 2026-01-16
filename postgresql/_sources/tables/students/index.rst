|table| Students 
=====================

.. |table| image:: /_static/images/sidebar_icons/table.png

-----------------------
1️⃣ What is students?
-----------------------

students is a **relation (table)** inside the public schema.

Conceptually:

Each **row = one student**

Each **column = one property of a student**

This is the **core data object** — everything else (indexes, constraints, triggers, views) exists because of this table.

===============================================================================================================================================================================

--------------------------------------------------------
2️⃣ A clean, production-ready students table (example)
--------------------------------------------------------

Let’s assume this is the table you created (or very close):

.. code-block:: postgres 

   CREATE TABLE students (
      id              BIGSERIAL PRIMARY KEY,
      first_name      TEXT NOT NULL,
      last_name       TEXT NOT NULL,
      email           TEXT UNIQUE NOT NULL,
      date_of_birth   DATE,
      enrollment_year INT NOT NULL,
      is_active       BOOLEAN NOT NULL DEFAULT true,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
   );

This single definition already explains **90% of PostgreSQL fundamentals.**

===============================================================================================================================================================================

----------------------------------
3️⃣ Column-by-column explanation 
----------------------------------

id BIGSERIAL PRIMARY KEY
	- Unique identifier for each student
	- Backed by a **sequence**
	- Automatically indexed
	- Never duplicated

This is how PostgreSQL knows one row from another.

===============================================================================================================================================================================

**first_name, last_name**

.. code-block:: postgres 

   TEXT NOT NULL

- Required fields
- TEXT has no length limit
- No artificial constraints unless needed

PostgreSQL prefers **flexible types + constraints**, not rigid sizes.

===============================================================================================================================================================================

email TEXT UNIQUE NOT NULL
	- Must be present
	- Must be unique across all students
	- Automatically creates a **unique index**

This is **data integrity at the database level**, not app level.

===============================================================================================================================================================================

date_of_birth DATE
	- Uses a real date type
	- No time, no timezone confusion

Always use semantic types instead of strings.

 enrollment_year INT
	- Numeric year
	- Can be validated with a CHECK constraint later

Example:

.. code-block:: postgres 

   CHECK (enrollment_year >= 1900)

is_active BOOLEAN DEFAULT true
	- Soft-delete / status flag
	- Safer than deleting rows

Common in real systems.

**created_at, updated_at**

.. code-block:: postgres 

   TIMESTAMPTZ DEFAULT now()

- Stores **time + timezone**
- Always use TIMESTAMPTZ, not TIMESTAMP
- Can be auto-updated with a trigger

This is **audit-ready design.**

===============================================================================================================================================================================

--------------------------------------------------
4️⃣ Why this table is “proper” PostgreSQL design
--------------------------------------------------

This table:
   - ✔ Uses **native data types**
   - ✔ Enforces **integrity via constraints**
   - ✔ Avoids app-only validation
   - ✔ Is index-friendly
   - ✔ Is security-ready (RLS can be added)
   - ✔ Is API-ready (PostgREST / Hasura compatible)

--------------------------------------------
5️⃣ How rows actually look (mental model)
--------------------------------------------

A row inside students looks like:

.. code-block:: bash 

   id | first_name | last_name | email | enrollment_year | is_active
   ---+------------+-----------+-------+-----------------+----------
   1  | Alice      | Smith     | ...   | 2023            | true

PostgreSQL stores this **row-wise**, optimized for transactional workloads.

===============================================================================================================================================================================

-----------------------------------------------
6️⃣ How PostgreSQL treats students internally
-----------------------------------------------

Behind the scenes:
	- Stored as **heap pages**
	- Indexed separately
	- MVCC keeps row versions
	- Constraints checked **before commit**

👉 You are working with a **real database engine**, not a file.

===============================================================================================================================================================================

--------------------------------
7️⃣ What students enables next
--------------------------------

Because this table exists, you can now safely add:
	- **Indexes** (performance)
	- **RLS policies** (security)
	- **Triggers** (automation)
	- **Views** (abstractions)
	- **APIs** (without writing backend code)

Everything builds on top of this table.

===============================================================================================================================================================================

----------------------------------------
8️⃣ Very important rule (remember this)
----------------------------------------

Design tables first. Everything else is optional.

Bad table design = bad system

Good table design = scalable system














.. toctree::
   :hidden:
   :maxdepth: 6
     
   columns/index
   constraints/index 
   indexes/index
   rlspolicies/index
   rules/index 
   triggers/index 

   