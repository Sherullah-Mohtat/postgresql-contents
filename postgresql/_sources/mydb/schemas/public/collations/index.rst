|collations| Collations
==========================

.. |collations| image:: /_static/images/sidebar_icons/collations.png

----------------------
What is a Collation?
----------------------

Collation decides how text is compared and sorted.

A collation defines how text is:
	- ✅ sorted (ORDER BY)
	- ✅ compared (=, <, >)
	- ✅ matched (LIKE, indexes)

In short:

Collation = language + rules for text comparison

=======================================================================================================

-------------------------
What Collation Controls
-------------------------

Collation affects ONLY text (TEXT, VARCHAR, CHAR) and controls:
	#. Sorting (ORDER BY)
	#. Comparing (=, <, >)
	#. Searching (LIKE)
	#. Index behavior on text

It does NOT affect:
	- numbers
	- dates
	- storage size

=======================================================================================================

--------------------
Real-world analogy
--------------------

.. list-table::
    :header-rows: 1

    * - Thing
      - What it means
    * - Dictionary
      - Has rules for word order
    * - Language
      - Has accents, cases, symbols
    * - Collation
      - Dictionary rules for the database

=======================================================================================================

Simple SQL example

Table

.. code-block:: postgres 

    CREATE TABLE names (name TEXT);

Data 

.. code-block:: postgres 

    INSERT INTO names VALUES
    ('apple'),
    ('Banana'),
    ('Álvaro');

=======================================================================================================

🔴 Without thinking about collation

.. code-block:: postgres 

    SELECT name FROM names ORDER BY name;

Result may be:

.. code-block:: bash 

    Banana
    apple
    Álvaro

Why?
	- Capital letters first
	- Accented letters last

That’s one **collation rule.**

=======================================================================================================

🟢 With a different collation

.. code-block:: postgres 

    SELECT name
    FROM names
    ORDER BY name COLLATE "en_US.UTF-8";

Result becomes more **human-friendly.**

=======================================================================================================

**Best practice**

For most apps:
    - Keep database default collation
    - Use C collation for:
        - emails
        - usernames
        - codes (fast & predictable)
    - Use language collation for:
        - names
        - descriptions

**Example**

.. code-block:: postgres 

    SELECT 'apple' = 'Apple';

Result depends on collation:
	- Some collations → false
	- Case-insensitive collation → true

That’s all collation does.

=======================================================================================================

Summary
	- Collation = text comparison rules
	- Controls sorting & comparing
	- Comes from language rules
	- You usually don’t touch it
	- You only customize it when needed

=======================================================================================================

-------------------
Pashto is special
-------------------

Pashto:
	- Uses **Arabic script**
	- Has extra letters (ټ ړ ږ ښ ځ etc.)
	- Reads **right-to-left**
	- Sorting rules are **different from English**

So **ASCII / C collation is NOT OK**

**Unicode-aware collation IS required**

=======================================================================================================

**What you MUST do**

1️⃣ Use UTF-8 database

.. code-block:: postgres 

    SHOW server_encoding;
    -- UTF8

2️⃣ Use ICU collation

Modern PostgreSQL (v10+) supports **ICU**, which handles:
	- Arabic script
	- Pashto letters
	- Unicode ordering
	- Case & accent rules

=======================================================================================================

**Check ICU support:**

.. code-block::  postgres 

    SELECT DISTINCT collprovider
    FROM pg_collation;

Possible results

If you see:

.. code-block:: bash 

    collprovider
    -------------
    c
    i
    d

Then:

.. list-table:: 
    :header-rows: 1

    * - Value
      - Meaning
    * - c
      - libc (en_US.UTF-8)
    * - i
      - ICU (und-x-icu) or (ar-x-icu)
    * - d
      - default Usually points to a libc or ICU

If i exists → **ICU is available on your system**

=======================================================================================================

**Side-by-side comparison**

.. list-table::
    :header-rows: 1

    * - Feature
      - ar-x-icu
      - und-x-icu
    * - Language-specific
      - Arabic family
      - Mixed / neutral
    * - Script awareness
      - Arabic script
      - All scripts
    * - Pashto support
      - ✅ Very good
      - ✅ Good
    * - Chinese support
      - ❌ Not ideal
      - ✅ Good
    * - English support
      - ✅
      - ✅
    * - Best for
      - Arabic-family text
      - Multilingual apps

=======================================================================================================

**Do you need ICU for Pashto?**

Short answer:
    Not strictly, but recommended for correctness

.. list-table::
    :header-rows: 1

    * - Scenario
      - Need ICU?
    * - Store Pashto text
      - ❌
    * - Display Pashto text
      - ❌
    * - Sort Pashto alphabetically
      - ✅
    * - Search linguistically
      - ✅
    * - Case-insensitive search
      - ✅

**Best practice create ICU-based DB (recommended)**

.. code-block:: postgres 

    CREATE DATABASE pashto_db
    WITH
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = icu
    ICU_LOCALE = 'und';

- und = Unicode default (safe for Pashto)
- Works perfectly for RTL languages

=======================================================================================================


Best practice for Pashto tables (recommended)

**Option A** — Use database default (most cases)

If your database was created with UTF-8 and ICU:

.. code-block:: postgres 

    CREATE TABLE pashto_words (
        word TEXT
    );

- ✔ Works
- ✔ Safe
- ✔ No extra setup
- ✔ Recommended for 90% cases

=======================================================================================================

**Option B** — Explicit Pashto-aware collation (advanced but clean)

If you want **full control:**

.. code-block:: postgres

    CREATE COLLATION ps_af (
        provider = icu,
        locale = 'ps-AF',
        deterministic = false
    );

Then use it:

.. code-block:: postgres 

    CREATE TABLE pashto_words (
        word TEXT COLLATE ps_af
    );

Or per query:

.. code-block:: postgres 

    SELECT word
    FROM pashto_words
    ORDER BY word COLLATE ps_af;

=======================================================================================================

**Create a pashto_words table now**

.. code-block:: postgres 

    CREATE TABLE pashto_words (
        word TEXT
    );

Insert data:

.. code-block:: postgres 

    INSERT INTO pashto_words (word) VALUES
    ('افغان'),
    ('پښتو'),
    ('ټولنه'),
    ('ښار'),
    ('کتاب'),
    ('ګل'),
    ('کور');

=======================================================================================================

**❌ WRONG: ASCII / C collation**

.. code-block:: postgres 

    SELECT word
    FROM pashto_words
    ORDER BY word COLLATE "C";

What happens (WRONG behavior)
	- PostgreSQL compares raw byte values
	- Arabic letters are ordered by Unicode codepoints
	- RTL is ignored
	- Pashto-specific order is ignored

Example result (❌ meaningless):

.. code-block:: bash 

    word  
    -------
    افغان
    ټولنه
    پښتو
    ښار
    کتاب
    کور
    ګل
    (7 rows)

- ➡️ This order does NOT follow Pashto alphabet rules
- ➡️ It’s just computer byte math

=======================================================================================================

**✅ CORRECT: ICU Pashto collation**

First, create (or use existing) Pashto collation:

.. code-block:: postgres 

    CREATE COLLATION ps_af (
        provider = icu,
        locale = 'ps-AF'
    );

Now sort:

.. code-block:: postgres 

    SELECT word
    FROM pashto_words
    ORDER BY word COLLATE ps_af;

**Correct Pashto order (✅)**

.. code-block:: bash 

    word  
    -------
    افغان
    پښتو
    ټولنه
    ښار
    کتاب
    کور
    ګل
    (7 rows)

- ✔ Respects Pashto alphabet
- ✔ Knows Arabic script
- ✔ Correct RTL handling
- ✔ Correct dictionary order

=======================================================================================================

**Super simple rule to remember**

English-only → default collation OK

Pashto / Arabic → ICU collation REQUIRED

But:
    **ICU is already built-in** → you usually don’t need to do anything extra.

=======================================================================================================

**1️⃣ What is UTF-8?**

UTF-8 = Universal text encoding

It answers the question:
    How are characters saved in bytes?

UTF-8 supports:
	- English (A–Z)
	- Pashto (پښتو)
	- Arabic (العربية)
	- Chinese (中文)
	- Emojis 😄🔥
	- Everything

Example

.. code-block:: bash 

    Hello
    پښتو
    سلام
    🙂

All of these can exist in **one column** because UTF-8 supports them.

In PostgreSQL

.. code-block:: postgres 

    SHOW server_encoding;

Result:

.. code-block:: bash 

    UTF8

This means database can store Pashto correctly

=======================================================================================================

**2️⃣ What is ICU?**

ICU = International Components for Unicode

It answers a different question:
    How should text be compared, sorted, and searched?

This is where **language rules** matter.

=======================================================================================================

**Why UTF-8 alone is NOT enough**

UTF-8 only stores characters.

It does **NOT** know:
	- Which letter comes first
	- How Pashto letters should be ordered
	- Case rules
	- Accent rules
	- RTL languages

That’s where **ICU** comes in.

=======================================================================================================

3️⃣ What ICU actually does

ICU understands:
	•	Alphabet order per language
	•	Case sensitivity
	•	Accent sensitivity
	•	Unicode normalization
	•	RTL languages

Example (Pashto letters)

Pashto letters:

.. code-block:: bash

    ا ب پ ت ټ ث ج چ

ICU knows:
	•	پ comes after ب
	•	ټ is different from ت
	•	Arabic rules ≠ English rules

Without ICU → sorting breaks
With ICU → sorting works
























