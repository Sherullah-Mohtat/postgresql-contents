|casts| Casts 
===============

.. |casts| image:: /_static/images/sidebar_icons/casts.png
  
-------------------------------
What are Casts in PostgreSQL?
-------------------------------

In PostgreSQL, a CAST defines how to convert a value from one data type to another.

In simple words:

    Casts tell PostgreSQL how to change one data type into another data type.

===========================================================================================================================

**Example**

.. code-block:: bash 

    SELECT '123'::integer;

Here:
	- '123' is **text**
	- ::integer tells PostgreSQL to cast text → integer

Result:

.. code-block:: bash 

    123

This conversion works because **a cast exists** from text → integer.

===========================================================================================================================

------------------
Why Casts Exist
------------------

PostgreSQL supports **many data types:**
	- text
	- integer
	- numeric
	- date
	- timestamp
	- json / jsonb
	- uuid
	- custom types

PostgreSQL must know:
	- Which conversions are allowed
	- How safe they are
	- Whether they are automatic or manual

That logic lives in **Casts.**

===========================================================================================================================

------------------------------
Where Casts Live (Important)
------------------------------

Casts are **database-level objects.**

That’s why in pgAdmin you see:

.. code-block:: bash 

    Database
    └── Casts

They are **not per table**

They are **not per schema**

They apply to the **entire database.**

===========================================================================================================================

-----------------
Types of Casts
-----------------

PostgreSQL supports three kinds of casts:

1️⃣ **Implicit Casts (Automatic)**

PostgreSQL converts automatically.

Example:

.. code-block:: sql

    SELECT 10 + 2.5;

Here:
	- 10 → integer
	- 2.5 → numeric

PostgreSQL **implicitly casts 10** → numeric

✅ No error

✅ Automatic conversion

===========================================================================================================================

2️⃣ **Assignment Casts**

Used when assigning values.

.. code-block:: sql 

    CREATE TABLE test (
        price numeric
    );

    INSERT INTO test VALUES (10);

10 (integer) → numeric

Allowed due to an **assignment cast.**

===========================================================================================================================

3️⃣ **Explicit Casts (Manual)**

You must specify the cast.

.. code-block:: sql

    SELECT CAST('2024-01-01' AS date);

Or 

.. code-block:: sql 

    SELECT '2024-01-01'::date;

PostgreSQL will **not guess** unless you tell it.

===========================================================================================================================

---------------------------------
Real Example: Why Casts Matter
---------------------------------

**Without proper cast**

.. code-block:: sql 

    SELECT 'abc'::integer;

❌ Error:

.. code-block:: bash 

    invalid input syntax for type integer

The cast exists, but **the value is invalid.**

===========================================================================================================================

**JSON Example**

.. code-block:: sql 

    SELECT '{"a":1}'::jsonb;

Here:
	- text → jsonb
	- Works because PostgreSQL has a **cast defined**

===========================================================================================================================

-----------------------------------
Creating Your Own Cast (Advanced)
-----------------------------------

You usually **do NOT need this**, but PostgreSQL allows it.

**Example: Custom cast**

.. code-block:: sql

    CREATE CAST (text AS uuid)
    WITH FUNCTION uuid(text)
    AS EXPLICIT;

⚠️ Only advanced users do this

⚠️ Can break queries if misused

===========================================================================================================================

-----------------------------------
When Should You Care About Casts?
-----------------------------------

You should understand casts if:
   - ✅ You get confusing type errors
   - ✅ You work with JSON / dates / numeric
   - ✅ You write complex SQL
   - ✅ You define custom types
   - ✅ You build database frameworks (like you)

===========================================================================================================================

---------------------------
When You Can Ignore Casts
---------------------------

You don’t need to manage casts manually if:
	- You write normal CRUD queries
	- You use ORMs (Django, SQLAlchemy)
	- You don’t define custom types

PostgreSQL handles them automatically.

Summary

.. note::

    Casts in PostgreSQL define how one data type can be converted into another.
    They enable PostgreSQL to safely and correctly handle operations involving different data types across the database.

    