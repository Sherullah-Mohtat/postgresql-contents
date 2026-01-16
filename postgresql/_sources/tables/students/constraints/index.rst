|constraints| Constraints 
=============================

.. |constraints| image:: /_static/images/sidebar_icons/constraints.png

------------------------
What are Constraints?
------------------------

In **PostgreSQL**, a **constraint** is:

A **rule enforced by the database** that guarantees data correctness.

Key idea:
	- Constraints are **not optional**
	- They are enforced **even if your app is buggy**
	- They protect data **forever**

===========================================================================================================================

--------------------------------
Where you see them in pgAdmin
--------------------------------

.. code-block:: bash

    students
    └── Constraints
        ├── Primary Key
        ├── Unique
        ├── Check
        └── Foreign Key

These rules live **inside the table**, not in the application.

===========================================================================================================================

-------------------------------------------------
The 5 Core Constraint Types (you must know all)
-------------------------------------------------

1️⃣ PRIMARY KEY (identity rule)
--------------------------------

What it means
	- Uniquely identifies each row
	- Cannot be NULL
	- Automatically indexed

Example

.. code-block:: postgres 

    id BIGSERIAL PRIMARY KEY

Guarantees
	- No duplicate students by ID
	- Fast lookups
	- Safe references from other tables

Every table should have **exactly one** primary key.

===========================================================================================================================

2️⃣ UNIQUE (no-duplicates rule)
--------------------------------

What it means
	- Values must be unique across rows
	- NULLs are allowed (unless NOT NULL)

Example

.. code-block:: postgres 

    email TEXT UNIQUE NOT NULL

Guarantees
	- No two students can share the same email
	- Automatically creates an index

This is **data integrity**, not validation logic.

===========================================================================================================================

3️⃣ NOT NULL (required field rule)
-----------------------------------

What it means
	- Value must exist
	- Prevents missing critical data

Example

.. code-block:: postgres 

    first_name TEXT NOT NULL

Guarantees
	- You never get incomplete records
	- No NULL surprises in queries

Use NOT NULL aggressively for required fields.

===========================================================================================================================

4️⃣ CHECK (business rule)
--------------------------

What it means
	- Custom condition evaluated on every insert/update
	- Can reference the column (or multiple columns)

Example

.. code-block:: postgres 

    enrollment_year INT
    CHECK (enrollment_year >= 1900)

Guarantees
	- Invalid values are rejected immediately
	- No “bad data cleanup” later

More examples:

.. code-block:: postgres 

    CHECK (date_of_birth <= CURRENT_DATE)
    CHECK (length(first_name) >= 2)

===========================================================================================================================

5️⃣ FOREIGN KEY (relationship rule)
-------------------------------------

What it means
	- Ensures referenced data exists
	- Enforces relational integrity

Example (future use)

.. code-block:: postgres 

    course_id INT
    REFERENCES courses(id)

Guarantees
	- You can’t reference non-existent data
	- Safe joins
	- Prevents orphan records

===========================================================================================================================

**Constraint execution order (important)**

When inserting a row, PostgreSQL checks:
	#.	Data type
	#.	NOT NULL
	#.	CHECK
	#.	UNIQUE
	#.	FOREIGN KEY

If **any** constraint fails → transaction is rejected.

**Constraints vs Application Validation (CRITICAL)**

.. list-table::
    :header-rows: 1

    * - Rule location
      - Can be bypassed?
      - Safe?
    * - App code
      - ✅ Yes
      - ❌ No
    * - API
      - ✅ Yes
      - ❌ No
    * - Database constraint
      - ❌ No
      - ✅ YES

**Never trust the app alone**

===========================================================================================================================

**Viewing constraints in SQL**

.. code-block:: postgres 

    SELECT conname, contype
    FROM pg_constraint
    WHERE conrelid = 'students'::regclass;

Constraint types:
	- p → primary key
	- u → unique
	- c → check
	- f → foreign key

===========================================================================================================================

Best-practice constraint design (production rules)

✔ Always use a primary key

✔ Use UNIQUE instead of “checking in code”

✔ Use CHECK for domain rules

✔ Use FOREIGN KEY for relationships

✔ Let the database reject bad data

===========================================================================================================================

**How Constraints connect to what’s next**

Constraints enable:
	- **Indexes** (performance)
	- **RLS** (security guarantees)
	- **Triggers** (automation)
	- **Views** (safe projections)
	- **APIs** (PostgREST / Hasura safety)

Bad constraints → broken system.



