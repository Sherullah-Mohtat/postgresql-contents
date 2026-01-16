|tables| Tables(1) 
======================

.. |tables| image:: /_static/images/sidebar_icons/tables.png

--------------------------------
1️⃣ What does Tables (1) mean?
--------------------------------

In pgAdmin, under:

.. code-block:: bash 

   Schemas
   └── public
      └── Tables (1)

**Tables (1) means:**

There is **exactly one table** inside the public schema.

In my case, that table is:

.. code-block:: bash 

   students

=========================================================================================================================

---------------------------------------------------
2️⃣ What is a Table in PostgreSQL (core concept)
---------------------------------------------------

A table is:
	- A persistent storage structure
	- Stores data in **rows (records)** and **columns (fields)**
	- Enforces **rules** (constraints)
	- Can be **secured** (RLS)
	- Can be **optimized** (indexes)
	- Can trigger **logic** (triggers)

Think of a table as:
   The single source of truth for your data

=========================================================================================================================

--------------------------------------------
3️⃣ Expand students — what each child means
--------------------------------------------

When you expand:

.. code-block:: bash 

   Tables
   └── students

You see:

.. code-block:: bash 

   Columns
   Constraints
   Indexes
   RLS Policies
   Rules
   Triggers

Each one is **not optional fluff** — they are **core table properties.**

=========================================================================================================================

-------------------------------------
4️⃣ Columns — structure of the table
-------------------------------------

.. code-block:: bash 

   students
   └── Columns

Columns define:
	- What data is stored
	- 	Data types
	- Nullability
	- Defaults

Example:

.. code-block:: postgres 

   first_name VARCHAR(100) NOT NULL

Without columns → table is meaningless.

=========================================================================================================================

5️⃣ Constraints — data integrity rules

.. code-block:: bash 

   students
   └── Constraints

Constraints protect your data from corruption.

Examples:
	- PRIMARY KEY
	- UNIQUE
	- CHECK
	- FOREIGN KEY

Example:

.. code-block:: postgres

   email UNIQUE NOT NULL

Constraints run **inside PostgreSQL**, not in your app

They **cannot be bypassed**

=========================================================================================================================

---------------------------------
6️⃣ Indexes — performance layer
---------------------------------

.. code-block:: bash 

   students
   └── Indexes

Indexes:
	- Make queries fast
	- Are automatically created for:
	- Primary keys
	- Unique constraints

Example:

.. code-block:: postgres 

   CREATE INDEX idx_students_email ON students(email);

Without indexes → slow queries at scale.

=========================================================================================================================

-------------------------------------------
7️⃣ RLS Policies — security at row level
-------------------------------------------

.. code-block:: bash 

   students
   └── RLS Policies

Row Level Security controls:
	- Who can see which rows
	- Who can modify which rows

Example idea:

.. code-block:: bash 

   student_id = current_user_id

This is **zero-trust security** inside PostgreSQL.

=========================================================================================================================

-----------------------------------------------
8️⃣ Rules — query rewriting (advanced, rare)
-----------------------------------------------

.. code-block:: bash 

   students
   └── Rules

Rules:
	- Rewrite queries before execution
	- Mostly legacy
	- Views often rely on rules internally

In modern systems:
	- Prefer **triggers** or **views**
	- Rules are rarely used directly

=========================================================================================================================

9️⃣ Triggers — automatic actions

.. code-block:: bash

   students
   └── Triggers

Triggers:
	- Run automatically on INSERT, UPDATE, DELETE
	- Enforce logic at DB level

Example:
	- Auto-update updated_at
	- Audit logs
	- Validation

Triggers call **Trigger Functions** (which you saw earlier).

=========================================================================================================================

-----------------------------------------
🔟 Why PostgreSQL tables are powerful
-----------------------------------------

A PostgreSQL table is **not just data storage.**

It includes:
	- Structure (columns)
	- Integrity (constraints)
	- Performance (indexes)
	- Security (RLS)
	- Automation (triggers)
	- Logic hooks (rules)

This is why PostgreSQL can safely power:
	- APIs (PostgREST, Hasura)
	- Financial systems
	- Multi-tenant SaaS
	- Zero-trust architectures

=========================================================================================================================

Mental model:
   A table is a mini-system, not a spreadsheet











.. toctree::
   :hidden:
   :maxdepth: 3
     
   students/index