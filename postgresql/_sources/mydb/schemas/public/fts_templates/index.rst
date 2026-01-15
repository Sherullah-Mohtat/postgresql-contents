|fts_templates| FTS Templates
===============================

.. |fts_templates| image:: /_static/images/sidebar_icons/fts_templates.png

--------------------------
What is an FTS Template?
--------------------------

An **FTS template** is the **blueprint for a dictionary.**
	- It defines **how a dictionary behaves**
	- It does **not** contain language rules itself
	- Dictionaries are **instances** created from templates

Think of it like this:

    **Template = class**

    **Dictionary = object created from that class**

=======================================================================================================

------------------------------------------
Where templates fit in the FTS pipeline
------------------------------------------

.. code-block:: bash 

    Text
    ↓
    Parser
    ↓
    Token types
    ↓
    Configuration
    ↓
    Dictionary (built from a template)
    ↓
    tsvector

- **Parser** splits text
- **Configuration** decides which dictionary to use
- **Dictionary** processes tokens
- **Template** defines how that dictionary works internally

=======================================================================================================

------------------------
Built-in FTS templates
------------------------

You’ll see these under Schemas → public → FTS Templates:

1. simple

What it does
	- Accepts tokens as-is
	- Lowercases text
	- No stemming
	- No stop-word removal

Use when
	- You want exact word matching
	- You don’t want linguistic changes

=======================================================================================================

2. snowball

What it does
	- Uses Snowball stemming algorithms
	- Reduces words to a root form
	- Removes stop words

Use when
	- You want linguistic search
	- “running”, “ran”, “runs” → same root

=======================================================================================================

3. ispell

What it does
	- Uses dictionary + affix files
	- Very accurate linguistic processing
	- Heavier to manage

Use when
	- You need strict dictionary-based normalization

=======================================================================================================

4. thesaurus

What it does
	- Maps words/phrases to synonyms
	- Expands search meaning

Use when
	- You want synonym-aware search
	- Example: “car” → “automobile”

=======================================================================================================

----------------------------
Templates vs Dictionaries
----------------------------

.. list-table:: 
    :header-rows: 1

    * - Concept
      - What it is
    * - Template
      - Processing engine
    * - Dictionary
      - Configured instance of a template

Example:

.. code-block:: postgres 

    CREATE TEXT SEARCH DICTIONARY my_simple_dict (
        TEMPLATE = simple
    );

Here:
	- simple = template
	- my_simple_dict = dictionary

=======================================================================================================

-----------------------
Why templates matter
-----------------------

Templates define:
	- Whether stemming is applied
	- Whether stop words are removed
	- Whether normalization happens
	- Whether external files are used

You **cannot** change behavior directly in a dictionary
→ You choose the correct **template**

=======================================================================================================

------------------------------------------------
Why you almost never create templates yourself
------------------------------------------------

Templates:
	- Are low-level
	- Are implemented in C
	- Are part of PostgreSQL internals

In real systems:
	- ✅ You create dictionaries
	- ❌ You do not create templates

=======================================================================================================

How pgAdmin shows templates

pgAdmin lists:
	- Template name
	- Underlying implementation
	- Whether it supports lexeme filtering

This mirrors:

.. code-block:: postgres 

    SELECT * FROM pg_ts_template;

=======================================================================================================

**Practical example (template → dictionary → config)**

.. code-block:: postgres 

    -- Dictionary from template
    CREATE TEXT SEARCH DICTIONARY my_dict (
        TEMPLATE = simple
    );

    -- Configuration using the dictionary
    ALTER TEXT SEARCH CONFIGURATION pg_catalog.english
        ALTER MAPPING FOR word
        WITH my_dict;

=======================================================================================================

Summary:
    FTS templates define how dictionaries work; dictionaries do the actual text processing.






