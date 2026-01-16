|columns| Columns 
====================

.. |columns| image:: /_static/images/sidebar_icons/columns.png

--------------------------------------------
1️⃣ What are Columns (in PostgreSQL terms)?
--------------------------------------------

A **column** is:

A **typed, constrained property** of a row in a table.

In students, each column describes **one fact** about a student.

In pgAdmin:

.. code-block:: bash 

    students
    └── Columns
        ├── id
        ├── first_name
        ├── last_name
        ├── email
        ├── date_of_birth
        ├── enrollment_year
        ├── is_active
        ├── created_at
        └── updated_at

Each column has **5 critical properties.**

===============================================================================================================================

------------------------------------------
2️⃣ The 5 core properties of every column
------------------------------------------

When you click a column in pgAdmin, PostgreSQL internally stores:

① Name

.. code-block:: bash 

    first_name

- Identifier inside SQL
- Must be unique per table
- Should be **stable** (renaming is expensive in large systems)

===============================================================================================================================

② Data Type (MOST IMPORTANT)

.. code-block:: bash 

    TEXT
    DATE
    BOOLEAN
    TIMESTAMPTZ

This defines:
	- How data is stored
	- How it’s indexed
	- Which operators work
	- Which functions apply

Example:

.. code-block:: bash 

    date_of_birth DATE

✅ Can compare dates

❌ Cannot accidentally store text

Always choose the most specific type possible

===============================================================================================================================

③ NULL / NOT NULL

.. code-block:: postgres 

    NOT NULL

This answers:
    “Is missing data allowed?”

Example:

.. code-block:: postgres 

    email TEXT NOT NULL

Rules:
	- NOT NULL = required field
	- Nullable = optional information

NULL is not empty
	- NULL = unknown
	- '' = empty string

===============================================================================================================================

④ Default value

.. code-block:: postgres 

    DEFAULT now()
    DEFAULT true

Example:

.. code-block:: postgres 

    created_at TIMESTAMPTZ DEFAULT now()

This means:
	- PostgreSQL fills the value automatically
	- App does NOT need to send it

Defaults reduce bugs and simplify APIs.

===============================================================================================================================

⑤ Constraints (attached rules)

Even at column level:

.. code-block:: postgres 

    email TEXT UNIQUE

or 

.. code-block:: postgres 

    enrollment_year INT CHECK (enrollment_year >= 1900)

Constraints are **database-enforced rules**, not suggestions.

===============================================================================================================================

-------------------------------------------
3️⃣ Column-by-column explanation (students)
-------------------------------------------

Let’s walk through them **as a database engineer would.**

**id BIGSERIAL**

.. code-block:: postgres 

    id BIGSERIAL PRIMARY KEY

- Auto-incrementing number
- Backed by a sequence
- Indexed automatically
- Immutable identity

This is **row identity**, not business data.

===============================================================================================================================

first_name TEXT NOT NULL
	- Human-readable data
	- Required
	- No length limit (Postgres optimizes TEXT)

Why not VARCHAR(50)?

PostgreSQL treats them the same, but TEXT avoids artificial limits.

**last_name TEXT NOT NULL**

Same reasoning as first_name.

email TEXT UNIQUE NOT NULL
	- Required
	- Must be unique
	- Automatically indexed

This column affects data integrity + performance.

date_of_birth DATE
	- Real date type
	- No timezone confusion
	- Optional

Never store dates as strings ❌

enrollment_year INT
	- Numeric, sortable
	- Can be validated
	- Fast comparisons

Example improvement:

.. code-block:: postgres 

    CHECK (enrollment_year BETWEEN 1900 AND extract(year from now()))

================================================================================================================================

is_active BOOLEAN DEFAULT true
	- Logical state flag
	- Enables soft deletes
	- Very index-friendly

created_at TIMESTAMPTZ DEFAULT now()
	- Records creation time
	- Timezone-aware
	- Safe for distributed systems

updated_at TIMESTAMPTZ
	- Tracks last modification
	- Usually updated by a trigger

Columns + triggers = automation.

================================================================================================================================

--------------------------------------------
4️⃣ How PostgreSQL stores columns internally
--------------------------------------------

	- Rows are stored row-wise
	- Each column has metadata:
	- type OID
	- null bitmap
	- alignment rules
	- TOAST is used for large values (TEXT, JSON, etc.)

Column choice affects **disk layout & performance.**

----------------------------------------
5️⃣ Column best practices (golden rules)
----------------------------------------

✔ Use **native types**

✔ Avoid overusing VARCHAR(n)

✔ Use NOT NULL aggressively

✔ Prefer defaults over app logic

✔ Add constraints early

✔ Name columns clearly and consistently

================================================================================================================================

------------------------------
6️⃣ What Columns enable next
------------------------------

Once columns are well-defined, you can safely add:
	- **Indexes** → fast queries
	- **Constraints** → strong data integrity
	- **RLS** → column-aware security
	- **Views** → column projection
	- **APIs** → automatic mapping (PostgREST / Hasura)

Bad columns → everything else breaks.








